import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";

const getNotes = asyncHandler(async (req, res, next) => {
  Note.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Xảy ra một số lỗi nên không thể thấy các bài viết",
      });
    });
});

const getNoteById = asyncHandler(async (req, res, next) => {
  Note.findById(req.params.id)
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Không tìm thấy " + req.params.id,
      });
    }
    res.send(data);
  })
  .catch((err) => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Không tìm thấy " + req.params.id,
      });
    }
    return res.status(500).send({
      message: "Không kết nối được với" + req.params.id,
    });
  });
});
const CreateNote = asyncHandler(async (req, res, next) => {
  const notes = new Note({
    content: req.body.content,
    title: req.body.title,
    category:req.body.category,
    
  });
  notes
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Có một số lỗi sai nào đó ở đây",
      });
    });
});
const DeleteNote = asyncHandler(async (req, res) => {
  Note.findByIdAndRemove(req.params.id)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Bài viết không được tìm thấy với " + req.params.id
          });
      }
      res.send({message: "Bài viết được xóa thành công"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Bài viết không được tìm thấy với " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Không thể xóa bài viết thuộc " + req.params.id
      });
  });
});
const UpdateNote = asyncHandler(async (req, res) => {
  Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title ,
    content: req.body.content,
    category: req.body.category
}, {new: true})
.then(note => {
    if(!note) {
        return res.status(404).send({
            message: "Bài viết không được tìm thấy với" + req.params.id
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Bài viết không được tìm thấy với" + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Cập nhật thất bại với " + req.params.id
    });
});
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
