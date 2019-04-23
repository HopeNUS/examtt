const regex = /((.+)\n.+\n.+\n.+\n([0-9]{2})-([0-9]{2})-.+\n([0-9]{1,2}):([0-9]{2}).+\n.+\n(.+)\n)/gm;
const regexMobile = /(Class\s+(.+)\s.+\s+.+\s+.+\s+.+\s+.+\s+.+\s+([0-9]{2})-([0-9]{2}).+\s+.+\s+([0-9]{1,2}):([0-9]{2}).+\s+.+\s+.+\s+.+\s+(.+)\s+)/gm;

const months = ["INVALID", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

function extractExamTtMonth(month) {
    return months[parseInt(month)];
}

function extractExamTtHour(hour) {
    const hourNum = parseInt(hour);
    const amPm = (hourNum < 7) ? "PM" : "AM";
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
            hour: extractExamTtHour(m[5]),
            minute: m[6],
            location: m[7]
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