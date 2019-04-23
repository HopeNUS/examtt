const BASE_URL = "https://hopenus-examtt-backend.herokuapp.com"

const LIFEGROUP_EXT = "/lifegroup"
const LIFEGROUP_URL = BASE_URL + LIFEGROUP_EXT
function getLifegroupUrl() { return LIFEGROUP_URL; }

const EXAMTT_EXT = "/exams"
const EXAMTT_URL = BASE_URL + EXAMTT_EXT
function getExamTtUrl(date, month) { return EXAMTT_URL + "/" + date + "/" + month; }
function getAddExamTtUrl() { return EXAMTT_URL; }

const PRAYER_SLOT_EXT = "/prayers"
const PRAYER_SLOT_URL = BASE_URL + PRAYER_SLOT_EXT
function getPrayerSlotUrl(date, month) { return PRAYER_SLOT_URL + "/" + date + "/" + month; }