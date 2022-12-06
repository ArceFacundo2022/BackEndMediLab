const {Router} = require('express')

const router = Router()


const History = require('../models/History')

const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/:id' , async (req, res)=> {
    const historys = await History.find({userId:req.params.id})
    res.json(historys)
})
// router.get('/' , async (req, res)=> {
//     const historys = await History.find()
//     res.json(historys)
// })

router.post('/:id' , upload.single('image'), async (req, res)=> {
    console.log(req.file.originalname)
    console.log(req.params.id)
    const {title, institucion, matricula} = req.body
    imagePath = `uploads\\${req.file.originalname}`

    const newHistory = new History({title, institucion, matricula, imagePath, userId:req.params.id})
    await newHistory.save()
    res.json({msg:'Historia Guardada',history:newHistory})
})

router.delete('/:id' , async (req, res)=> {
    const history = await History.findByIdAndDelete(req.params.id)
    res.json({msg:'Eliminado',historyDelete:history})

})

module.exports = router