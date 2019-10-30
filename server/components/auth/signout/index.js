const router = require("express").Router();

router.get("/", (req, res) => {
  // TODO send the login value just in case? Ensure the user is who they are as a level of security
  // why not?
  console.log(`/api/s ignout reached`);

  req.session.cookie.maxAge = 0;

//   req.session.destroy(error => {
//     if (error) {
//       console.log(
//         `[auth/signout -> req.session.destroy()] An error occured, req.session`,
//         req.session
//       );
//       res.json({
//         success: false,
//         message: "An error occured trying to sign you out.",
//         dataDescription: "error from req.session.destroy()",
//         data: {
//           error
//         }
//       });
//     }
// 
//     console.log(
//       `[auth/signout -> req.session.destroy()] Successfully destroyed session, req.session`,
//       req.session
//     );
// 
//     res.clearCookie("user_sid");
//     
//     res.json({
//       success: true,
//       message: "Signed out!",
//       dataDescription: "",
//       data: {}
//     });
//   });

  res.status(200).json({data: 'data'})
});

module.exports = router;
