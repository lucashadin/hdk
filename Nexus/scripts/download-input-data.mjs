import * as fs from 'fs';
import  mysql from 'mysql-await';


// to run this file type in terminal: npm run download-input-data
const game_id = '1324822085050602'
const start_date = '2023-06-26'
const xyz_rounding = 2


// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'd.hiber.dive.games',
  user: 'dive_hiber_ro',
  password: '$og04#bqD*gI',
  database: 'hiber_landing',
});

// Connect to the MySQL database
connection.connect();



// Define your SQL query
let aggregated_query = '';
let raw_query = '';
let heatmap_query = '';

let combined_data = {
  aggregated: [],
  raw: [],
  heatmap  : [],
};


aggregated_query = `
    SELECT
      e.name,
      CONCAT('[', 
      ROUND(json_extract_string(raw_json::coord_xyz, 0) / ${xyz_rounding}) * ${xyz_rounding},
        ',',
        ROUND(json_extract_string(raw_json::coord_xyz, 1) / ${xyz_rounding}) * ${xyz_rounding},
        ',',
        ROUND(json_extract_string(raw_json::coord_xyz, 2) / ${xyz_rounding}) * ${xyz_rounding},
        ']'
      ) AS pos_xyz,
      "[0,0,0]" as rot_xyz,
      COUNT(*) AS count
    FROM hiber_landing.events AS e
    WHERE 1=1
      AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
      -- AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND e.name IN ('gameStats')
      AND environment IN ('prod', 'production')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2
    order by count desc
    limit 3000;
  `;


raw_query = `
    SELECT
      e.name,
      raw_json::coord_xyz AS pos_xyz,
      raw_json::rot_xyz AS rot_xyz,
      COUNT(*) AS count
    FROM hiber_landing.events AS e
    WHERE 1=1
    AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
      -- AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND e.name IN ('gameWorldLeft','gameRestarted','gameLifeLost', 'gameEmote')
      AND environment IN ('prod', 'production')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2,3
    order by rand()
    limit 2000;
  `;



heatmap_query = `
select
distinct
name,
coalesce(percentile_cont(0.90) within group (order by count) over (partition by name) ,0) as 90_percentile,
coalesce(percentile_cont(0.50) within group (order by count) over (partition by name) ,0) as 50_percentile,
coalesce(percentile_cont(0.25) within group (order by count) over (partition by name) ,0) as 25_percentile
from
(
    SELECT
      e.name,
      CONCAT('[', 
      ROUND(json_extract_string(raw_json::coord_xyz, 0) / ${xyz_rounding}) * ${xyz_rounding},
        ',',
        ROUND(json_extract_string(raw_json::coord_xyz, 1) / ${xyz_rounding}) * ${xyz_rounding},
        ',',
        ROUND(json_extract_string(raw_json::coord_xyz, 2) / ${xyz_rounding}) * ${xyz_rounding},
        ']'
      ) AS pos_xyz,
      "[0,0,0]" as rot_xyz,
      COUNT(*) AS count
    FROM hiber_landing.events AS e
    WHERE 1=1
    AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
      AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND environment IN ('prod', 'production')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2
    )
  `;



  // Execute the aggregated query
  combined_data.aggregated = await connection.awaitQuery(aggregated_query).catch((error, results) => {
    if (error) {
      console.error('Error executing aggregated query:', error);
      return;
    }

    combined_data.aggregated = results;
  });

  // Execute the raw query
  combined_data.raw = await connection.awaitQuery(raw_query).catch((error, results) => {
    if (error) {
      console.error('Error executing raw query:', error);
      return;
    }

    
  });

  // Execute the heatmap query
  combined_data.heatmap = await connection.awaitQuery(heatmap_query).catch((error, results) => {
    if (error) {
      console.error('Error executing heatmap query:', error);
      return;
    }

    combined_data.heatmap = results;

  });
  
  
  // Save the results locally as a JSON file
  fs.writeFile('./data/combined.json', JSON.stringify(combined_data), 'utf8', (err) => {
    if (err) {
      console.error('Error saving data:', err);
      return;
    }

    console.log('Combined Dive Events Data saved locally as dive_data_heatmap.json');
    // Close the MySQL connection after all queries are executed
    connection.end();
  });


