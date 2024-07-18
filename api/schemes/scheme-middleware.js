/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const schemes = require('./scheme-model')
const checkSchemeId = (req, res, next) => {
  const {scheme_id} = req.params
schemes.findById(scheme_id)
.then(scheme => {
  if(scheme && Object.keys(scheme).length > 0){ req.scheme = scheme; next()}
  else
  res.status(404).json({message:`scheme with scheme_id ${scheme_id} not found`})
})
.catch(err => res.status(err.status || 500).json({
  Location: 'this error is in the middleware checkSchemeId',
  message: err.message,
  stack: err.stack,
}))
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
