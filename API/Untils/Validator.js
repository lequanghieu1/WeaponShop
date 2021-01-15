const validateInfoManager = (data) => {
// password required
    // should contain at least one digit
    // should contain at least one lower case
    // should contain at least one upper case
    // should contain at least 8 from the mentioned characters
  if( !data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) ){
    return false
  }
  if( !data.user_name.length < 0 ){
    return false
  }
  if( !data.full_name.length < 0 ){
    return false
  }
  return true;
 
}
const validateEventCode = (data) => {
  // password required
      // should contain at least one digit
      // should contain at least one lower case
      // should contain at least one upper case
      // should contain at least 8 from the mentioned characters

    if( !data.code.length < 0 ){
      return false
    }
    if( !data.name.length < 0 ){
      return false
    }
    return true;
   
  }
module.exports = { validateInfoManager };