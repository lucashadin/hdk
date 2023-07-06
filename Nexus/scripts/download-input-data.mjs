import * as fs from 'fs';
import  mysql from 'mysql-await';


// to run this file type in terminal: npm run download-input-data
const game_id = '1401066903625944'
const start_date = '2023-07-06'
const xyz_rounding = 3


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
let game_panel_query = '';

let combined_data = {
  aggregated: [],
  raw: [],
  heatmap  : [],
  game_panel  : [],
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
    limit 4000;
  `;


raw_query = `
with average_fps as
(
select
e.player_id,
round(avg(avg_fps)) as avg_fps
from hiber_landing.events e
where 1=1
and name in ('gameStats')
and date_utc between '2023-07-06' AND CURDATE()                       
and environment in ('production', 'prod')	
and platform = 'web'		
and id = '1401066903625944'
group by 1
)

SELECT
e.name,
raw_json::coord_xyz AS pos_xyz,
raw_json::rot_xyz AS rot_xyz,
COUNT(*) AS count,
coalesce(af.avg_fps, 'Unknown') as metadata1,
coalesce(up.username, 'Unknown') as metadata2
FROM hiber_landing.events AS e
left join hiber_panel.user_panel up on e.player_id = up.player_id
left join average_fps af on e.player_id = af.player_id
WHERE 1=1
AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
-- AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
AND e.name IN ('gameWorldLeft')
AND environment IN ('prod', 'production')
AND id = '${game_id}'
AND mode_header = 'play'
AND raw_json::coord_xyz IS NOT NULL
GROUP BY 1,2,3
order by rand()
limit 500

union all

SELECT
e.name,
raw_json::coord_xyz AS pos_xyz,
raw_json::rot_xyz AS rot_xyz,
COUNT(*) AS count,
reason as metadata1,
coalesce(up.username, 'Unknown') as metadata2
FROM hiber_landing.events AS e
left join hiber_panel.user_panel up on e.player_id = up.player_id
WHERE 1=1
AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
-- AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
AND e.name IN ('gameRestarted')
AND environment IN ('prod', 'production')
AND id = '${game_id}'
AND mode_header = 'play'
AND raw_json::coord_xyz IS NOT NULL
GROUP BY 1,2,3
order by rand()
limit 500

union all

SELECT
e.name,
raw_json::coord_xyz AS pos_xyz,
raw_json::rot_xyz AS rot_xyz,
COUNT(*) AS count,
reason as metadata1,
coalesce(up.username, 'Unknown') as metadata2
FROM hiber_landing.events AS e
left join hiber_panel.user_panel up on e.player_id = up.player_id
WHERE 1=1
AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
-- AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
AND e.name IN ('gameLifeLost')
AND environment IN ('prod', 'production')
AND id = '${game_id}'
AND mode_header = 'play'
AND raw_json::coord_xyz IS NOT NULL
GROUP BY 1,2,3
order by rand()
limit 500

union all

SELECT
e.name,
raw_json::coord_xyz AS pos_xyz,
raw_json::rot_xyz AS rot_xyz,
COUNT(*) AS count,
game_name as metadata1,
coalesce(up.username, 'Unknown') as metadata2
FROM hiber_landing.events AS e
left join hiber_panel.user_panel up on e.player_id = up.player_id
WHERE 1=1
AND e.date_utc BETWEEN '${start_date}' AND CURDATE()
-- AND e.name IN ('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
AND e.name IN ('gameEmote')
AND environment IN ('prod', 'production')
AND game_id = '${game_id}'
AND mode_header = 'play'
AND raw_json::coord_xyz IS NOT NULL
GROUP BY 1,2,3
order by rand()
limit 500   
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

game_panel_query = `
select
game_name_latest,
creator_username,
date_created,
unique_players, 
count_gs_session_id,
median_completion_time,
avg_game_session_time,
unique_completions/unique_players as completion_rate,
median_world_loading_time,
median_fps,
avg_game_quality_score
from hiber_dev.game_panel 
where 1=1
and game_id = '${game_id}'
  `;



  // Execute the aggregated query
  combined_data.aggregated = await connection.awaitQuery(aggregated_query).catch((error, results) => {
    if (error) {
      console.error('Error executing aggregated query:', error);
      return;
    }

    // combined_data.aggregated = results;
  });

  // Execute the raw query
  combined_data.raw = await connection.awaitQuery(raw_query).catch((error, results) => {
    if (error) {
      console.error('Error executing raw query:', error);
      return;
    }

    // combined_data.raw = results;
    
  });

  // Execute the heatmap query
  combined_data.heatmap = await connection.awaitQuery(heatmap_query).catch((error, results) => {
    if (error) {
      console.error('Error executing heatmap query:', error);
      return;
    }

    // combined_data.heatmap = results;

  });

  // Execute the game panel query
  combined_data.game_panel = await connection.awaitQuery(game_panel_query).catch((error, results) => {
    if (error) {
      console.error('Error executing game panel query:', error);
      return;
    }

    // combined_data.game_panel = results;

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


