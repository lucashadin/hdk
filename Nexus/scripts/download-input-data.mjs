import * as fs from 'fs';
import * as mysql from 'mysql';


// to run this file type in terminal: npm run download-input-data
const game_id = '1358077321109633'


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
const query = `
select
e.name,
raw_json::coord_xyz as pos_xyz,
raw_json::rot_xyz as rot_xyz,
count(*) as count
from hiber_landing.events as e
where 1=1
and e.date_utc between '2023-06-01' and CURDATE()
and e.name in('gameStats','gameEmote','gameInteract','gameContentShown','gameSignalSent','gameWorldLeft','gameRestarted','gameFinished')
and environment in ('dev', 'development')
-- and player_id = '3547'
and id = '${game_id}'
and mode_header = 'play'
and raw_json::coord_xyz is not null
group by 1,2,3;

`


// Execute the SQL query
connection.query(query, (error, results) => {
  if (error) throw error;

  // Save the results locally as a JSON file
  fs.writeFile('./data/dive_data.json', JSON.stringify(results), 'utf8', (err) => {
    if (err) throw err;
    console.log('Results saved locally as results.json');
  });

  

  // Close the MySQL connection
  connection.end();
});

const worldJson = await (await fetch(`https://api.dev.hiberdev.net/project/${game_id}.world`)).json();

  // Save the results locally as a JSON file
  fs.writeFile('./data/world_data.json', JSON.stringify(worldJson), 'utf8', (err) => {
    if (err) throw err;
    console.log('Results saved locally as world_data.json');
  });