const { Project } = require("../models/projectModel");
const { User } = require("../models/userModel");

module.exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      status: "success",
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "cannot get projects"
    });
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
    }
    res.json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "cannot find project"
    });
  }
};

module.exports.createProject = async (req, res) => {
  const {
    companyName,
    companyLocation,
    contactInformation,
    teamBackground,
    projectTitle,
    projectDescription,
    preventiveMeasures,
    habitationRestoration,
    pictureUrl,
    acceptableCurrency,
    walletAddress,
    estimatedAmount,
    fundingGoals,
  } = req.body;

  try {
    // console.log("req.user:", req.user);
    const createdBy = req.user._id;
    //check if user exist
    const user = await User.findById(createdBy);
    //console.log(user)
    const projects = await Project.create({
      companyName,
      companyLocation,
      contactInformation,
      teamBackground,
      projectTitle,
      projectDescription,
      preventiveMeasures,
      habitationRestoration,
      pictureUrl,
      acceptableCurrency,
      walletAddress,
      estimatedAmount,
      fundingGoals,
      createdBy: req.user.id,
    });
    res.status(201).json({
      status: "success",
      data: {
        projects,
      },
    });

  } catch (error) {
    console.error("Error creating project", error)
    res.status(400).json({
      status: "fail",
      error: "cannot create project",
    });
  }
};
