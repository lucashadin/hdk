import * as fs from 'fs';
import * as mysql from 'mysql';


// to run this file type in terminal: npm run download-input-data
const game_id = '1396328036999394'
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
      AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND environment IN ('prod', 'production')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2;
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
      AND e.name IN ('gameWorldLeft','gameRestarted')
      AND environment IN ('prod', 'production')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2,3
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
  connection.query(aggregated_query, (error, results) => {
    if (error) {
      console.error('Error executing aggregated query:', error);
      return;
    }

    // Save the results locally as a JSON file
    fs.writeFile('./data/dive_data_aggregated.json', JSON.stringify(results), 'utf8', (err) => {
      if (err) {
        console.error('Error saving aggregated data:', err);
        return;
      }

      console.log('Aggregated Dive Events Data saved locally as dive_data_aggregated.json');
    });
  });

  // Execute the raw query
  connection.query(raw_query, (error, results) => {
    if (error) {
      console.error('Error executing raw query:', error);
      return;
    }

    // Save the results locally as a JSON file
    fs.writeFile('./data/dive_data_raw.json', JSON.stringify(results), 'utf8', (err) => {
      if (err) {
        console.error('Error saving raw data:', err);
        return;
      }

      console.log('Raw Dive Events Data saved locally as dive_data_raw.json');
    });
  });

  // Execute the heatmap query
  connection.query(heatmap_query, (error, results) => {
    if (error) {
      console.error('Error executing heatmap query:', error);
      return;
    }

    // Save the results locally as a JSON file
    fs.writeFile('./data/dive_data_heatmap.json', JSON.stringify(results), 'utf8', (err) => {
      if (err) {
        console.error('Error saving heatmap data:', err);
        return;
      }

      console.log('Heatmap Dive Events Data saved locally as dive_data_heatmap.json');
      // Close the MySQL connection after all queries are executed
      connection.end();
    });
  });





const worldJson = await (await fetch(`https://api.hiberworld.com/project/${game_id}.world`)).json();

// Save the results locally as a JSON file
fs.writeFile('./data/world_data.json', JSON.stringify(worldJson), 'utf8', (err) => {
  if (err) throw err;
  console.log('World Data saved locally as world_data.json');
});