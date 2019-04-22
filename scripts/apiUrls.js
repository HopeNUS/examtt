let BASE_URL = "https://hopenus-examtt-backend.herokuapp.com"

let LIFEGROUP_EXT = "/lifegroup"
let LIFEGROUP_URL = BASE_URL + LIFEGROUP_EXT
function getLifegroupUrl() { return LIFEGROUP_URL; }

let EXAMTT_EXT = "/exams"
let EXAMTT_URL = BASE_URL + EXAMTT_EXT
function getExamTtUrl(date, month) { return EXAMTT_URL + "/" + date + "/" + month; }
function getAddExamTtUrl() { return EXAMTT_URL; }