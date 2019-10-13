const formFields = (arrflds,reqobj,res) => {
  errors = []
  arrflds.forEach(element => {
    if (reqobj[element] === undefined){
      errors.push(`${element} is required`)
    };
  });

  if (errors.length >= 1){
    res.status(400).json({
      errors: errors
    })
  }
}

module.exports = formFields