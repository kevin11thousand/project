var express = require('express');
var session = require('express-session');
var router = express.Router();
const {PrismaClient}= require("@prisma/client")
var prisma= new PrismaClient

/* GET home page. */
router.get('/users', async function(req, res, next) {
  const user = req.session.user; // Fetch the user data from session
  if (!user || user.usertype !== 'user') {
    // If user is not logged in or not an admin, redirect to login page
    res.redirect('/login');
    return;
  }
  var students = await prisma.student_info.findMany()

  res.render('users/users', { title: 'Express',students: students });
});

 

module.exports = router;
