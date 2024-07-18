/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const schemes = require('./scheme-model')
const checkSchemeId = (req, res, next) => {
  const {id} = req.params
schemes.findById(id)
.then(sheme => {
  if(sheme && Object.keys(sheme).length > 0){ req.sheme = sheme; next()}
  else
  res.status(404).json({message:`scheme with scheme_id ${id} not found`})
})
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
const {scheme_name} = req.body
if(typeof scheme_name !== "string" || !scheme_name || scheme_name.length < 0){
/////////////////////////////////
   return res.status(400).json({message:"invalid scheme_name"})
/////////////////////////////////
  }
  else next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
const {step} = req.body
if(!step.instructions || step.instructions.length < 0 || 
  typeof step.instructions !== "string" || 
  typeof step.step_number !== "number" || step.step_number < 1){ 
////////////////////////////////////////////
    res.status(400).json({message:"invalid step"})
//////////////////////////////////////////////
  }
  else next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
