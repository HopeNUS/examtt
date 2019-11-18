const regex = /((?<code>.+)\n.+\n.+\n.+\n(?<date>[0-9]{2})-(?<month>[0-9]{2})-.+\n(?<hour>[0-9]{1,2}):(?<minute>[0-9]{2}).+\n.+\n(?<venue>.+))/gm;
const regexYYmmdd = /((?<code>.+)\n.+\n.+\n.+\n.+-(?<month>[0-9]{2})-(?<date>[0-9]{2})\n(?<hour>[0-9]{1,2}):(?<minute>[0-9]{2}).+\n.+\n(?<venue>.+))/gm;
const regexMobile = /(Class\s*(?<code>.+)\s.+\s*.+\s*.+\s*.+\s*.+\s*Exam Date\s*(?<date>[0-9]{2})-(?<month>[0-9]{2}).+\s*Schedule\s*(?<hour>[0-9]{1,2}):(?<minute>[0-9]{2}).+\s*.+\s*.+\s*Exam Venue\s*(?<venue>.+)\s*)/gm;
const regexByDate = /[A-Z]+ (?<month>[A-Z]{3}).*?(?<date>[0-9]{1,2})\s+(?<hour>[0-9]{1,2}):(?<minute>[0-9]{2}).+\s+(?<code>.+)\s+.+\s+VENUE:\s+(?<venue>.+)/gm;

function extractExamTtMonth(month) {
    if (MONTHS.includes(month)) return month;
    return MONTHS[parseInt(month)];
}

function extractExamTtHour(hour) {
    const hourNum = parseInt(hour);
    const amPm = (hourNum < 7) ? "PM" : "AM";
    return (amPm == "AM") 
        ? (hourNum < 10) ? "0" + hourNum : "" + hourNum
        : (hourNum + 12) + "";
}

function extractExamTtDate(date) {
    const dateNum = parseInt(date);
    return (date < 10) ? "0" + dateNum : "" + dateNum;
}

function extractExamTtModulesRegex(str, reg) {
    let modules = [], m;
    while ((m = reg.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === reg.lastIndex) {
            reg.lastIndex++;
        }
        
        m = m.groups;
	const extracted_hour = extractExamTtHour(m['hour']);
        const module = {
            code: m['code'],
            date: extractExamTtDate(m['date']),
            month: extractExamTtMonth(m['month']),
            hour: extracted_hour,
            minute: m['minute'],
            location: m['venue'],
            location_index: LOCATIONS[m['venue']],
            datetime: `${m['date']}/${m['month']}/${YEAR} ${extracted_hour}:${m['minute']}`,
        }
        modules.push(module)
    }
    return modules
}

function extractExamTtModulesDesktop(str) {
    return extractExamTtModulesRegex(str, regex);
}

function extractExamTtModulesYYmmddDesktop(str) {
    return extractExamTtModulesRegex(str, regexYYmmdd);
}

function extractExamTtModulesMobile(str) {
    return extractExamTtModulesRegex(str, regexMobile);
}

function extractExamTtModulesByDateDesktop(str) {
    return extractExamTtModulesRegex(str.toUpperCase(), regexByDate);
}

function extractExamTtModules(str) {
    let modules = extractExamTtModulesDesktop(str);
    if (modules.length > 0) return modules;
    modules = extractExamTtModulesYYmmddDesktop(str);
    if (modules.length > 0) return modules;
    modules = extractExamTtModulesMobile(str);
    if (modules.length > 0) return modules;
    modules = extractExamTtModulesByDateDesktop(str);
    return modules;
    
}
