module.exports.calcAge = (birthday) => {
    let ageDifMs = Date.now() - new Date(birthday).getTime();
    let ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}