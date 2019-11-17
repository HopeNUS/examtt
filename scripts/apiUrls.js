const BASE_URL = "https://hopenus-examtt-backend.herokuapp.com";
$.get(BASE_URL);

const LIFEGROUP_EXT = "/lifegroup";
const LIFEGROUP_URL = BASE_URL + LIFEGROUP_EXT;
function getLifegroupUrl() { return LIFEGROUP_URL; }

const BATCH_INSERT_EXAMS = BASE_URL + "/batch_insert_exams";
const GET_EXAMS_URL = BASE_URL + '/get_exams';
function getExamTtUrl() { return GET_EXAMS_URL; }
function getAddExamTtUrl() { return BATCH_INSERT_EXAMS; }

const WARRIOR_UNSUB_PRAYER_SLOT_URL =  BASE_URL + '/batch_delete_prayer_warriors';
const WARRIOR_SUB_PRAYER_SLOT_URL = BASE_URL + '/batch_insert_prayer_warriors';
function getDeleteWarriorSubscriptionUrl() { return WARRIOR_UNSUB_PRAYER_SLOT_URL; }
function getAddWarriorSubscriptionUrl() { return WARRIOR_SUB_PRAYER_SLOT_URL; }
