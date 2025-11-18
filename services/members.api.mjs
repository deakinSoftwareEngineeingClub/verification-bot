import { createClient } from '@supabase/supabase-js'

import config from '../config/config.json' with { type: 'json' };


//Status Incomplete - Needs to be used inconjuction with verificationModal 

const supabase = createClient(config.supabaseUrl, config.supabaseKey);


const { data: master_db_data, error: readError } = await supabase
  .from('master_db')
  .select('student_id, full_name')

if (readError) {
  console.error('Error reading master_db:', readError)
}

const member_student_id = []
master_db_data.forEach(student => {
  const id = student.student_id

  member_student_id.push(id)
  console.log(id);
});

console.log(member_student_id.length);
 
const member_full_name = []
master_db_data.forEach(student => {
  const name = student.full_name
    .toLowerCase();

  member_full_name.push(name)
  console.log(name);
});


console.log(member_full_name.length); 