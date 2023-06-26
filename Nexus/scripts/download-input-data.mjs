import * as fs from 'fs';
import * as mysql from 'mysql';


// to run this file type in terminal: npm run download-input-data
const game_id = '1358077321109633'
const query_type = 'aggregate' // 'aggregate' or 'raw'
const xyz_rounding = 5


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
let query = '';

if (query_type == 'aggregate') {
  console.log('aggregate');
  query = `
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
      AND e.date_utc BETWEEN '2023-06-01' AND CURDATE()
      AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND environment IN ('dev', 'development')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      -- AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2;
  `;

} else if (query_type == 'raw') {
  console.log('raw');
  query = `
    SELECT
      e.name,
      raw_json::coord_xyz AS pos_xyz,
      raw_json::rot_xyz AS rot_xyz,
      COUNT(*) AS count
    FROM hiber_landing.events AS e
    WHERE 1=1
      AND e.date_utc BETWEEN '2023-06-01' AND CURDATE()
      AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND environment IN ('dev', 'development')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      -- AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2,3;
  `;
} else {
  console.log('query_type is not valid');
}




// Execute the SQL query
connection.query(query, (error, results) => {
  if (error) throw error;


  // Save the results locally as a JSON file
  fs.writeFile('./data/dive_data.json', JSON.stringify(results), 'utf8', (err) => {
    if (err) throw err;
    console.log('Dive Events Data saved locally as dive_data.json');
  });

    // Close the MySQL connection
    connection.end();
  });



  
  // Do another query to calculate the thresholds for the heatmap. Repeat same structure as above
  // Define your SQL query
  let query2 = '';

  query2 = `
select
distinct
name,
coalesce(percentile_cont(0.90) within group (order by count) over (partition by name) ,0) as 75_percentile,
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
      AND e.date_utc BETWEEN '2023-06-01' AND CURDATE()
      AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
      AND environment IN ('dev', 'development')
      -- AND player_id = '3547'
      AND id = '${game_id}'
      -- AND mode_header = 'play'
      AND raw_json::coord_xyz IS NOT NULL
    GROUP BY 1,2
    )
  `;



// Execute the SQL query
connection.query(query2, (error, results) => {
  if (error) throw error;

  // Save the results locally as a JSON file
  fs.writeFile('./data/dive_heatmap_data.json', JSON.stringify(results), 'utf8', (err) => {
    if (err) throw err;
    console.log('Dive Heatmap Data saved locally as dive_heatmap_data.json');
  });

  // Close the MySQL connection
  connection.end();
});

const worldJson = await (await fetch(`https://api.dev.hiberdev.net/project/${game_id}.world`)).json();

// Save the results locally as a JSON file
fs.writeFile('./data/world_data.json', JSON.stringify(worldJson), 'utf8', (err) => {
  if (err) throw err;
  console.log('World Data saved locally as world_data.json');
});