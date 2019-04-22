const regex = /((.+)\n.+\n.+\n.+\n([0-9]{2})-([0-9]{2})-.+\n([0-9]{1,2}):([0-9]{2})(AM|PM).+\n.+\n(.+)\n)/gm;
const regexMobile = /(Class(.+)\n.+\n.+\n.+\n.+\nExam Date([0-9]{2})-([0-9]{2}).+\nSchedule([0-9]{1,2}):([0-9]{2})(AM|PM).+\n.+\nExam Venue(.+))/gm;

const months = ["INVALID", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

function extractExamTtMonth(month) {
    return months[parseInt(month)];
}

function extractExamTtHour(hour, amPm) {
    const hourNum = parseInt(hour);
    return (amPm == "AM") 
        ? (hourNum < 10) ? "0" + hourNum : "" + hourNum
        : (hourNum + 12) + "";
}

function extractExamTtModulesRegex(str, reg) {
    let modules = [], m;
    while ((m = reg.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === reg.lastIndex) {
            reg.lastIndex++;
        }
        
        const module = {
            code: m[2],
            date: m[3],
            month: extractExamTtMonth(m[4]),
            hour: extractExamTtHour(m[5], m[7]),
            minute: m[6],
            location: m[8]
        }
        modules.push(module)
    }
    return modules
}

function extractExamTtModulesDesktop(str) {
    return extractExamTtModulesRegex(str, regex);
}

function extractExamTtModulesMobile(str) {
    return extractExamTtModulesRegex(str, regexMobile);
}

function extractExamTtModules(str) {
    const modules = extractExamTtModulesDesktop(str);
    if (modules.length > 0) return modules;
    return extractExamTtModulesMobile(str);
    
}