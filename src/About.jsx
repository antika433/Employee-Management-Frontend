import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-section">
      <h2>About This Website</h2>
      <p>
        This website is an <strong>Employee Management System</strong> built to help
        managers and teams keep track of employees easily.
      </p>
      <p>
        You can <strong>add new employees</strong>, update their details such as
        <em> name, manager, and salary</em>, or even delete records if needed.
        It also provides a simple way to <strong>search</strong> and quickly find
        employees in the list.
      </p>
      <p>
        The main goal is to give managers a clear view of all employees and their
        records in one place — making management simple, fast, and effective.
      </p>

      <blockquote className="thought">
        "A well-managed team is not just about numbers, but about keeping
        clarity, trust, and growth alive through simple tools."
      </blockquote>

      <p className="author"><em>— Antika Das</em></p>
    </div>
  );
};

export default About;
