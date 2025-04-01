<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrique Gomez - Portfolio</title>
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <style>
        /* General Styles */
        body {
            margin: 0;
            font-family: "Roboto", Arial, sans-serif;
            background-color: #808080;
            color: #fff;
            display: flex;
            height: 100vh;
        }

        # Sidebar Styles #
        .sidebar {
            width: 225px;
            background-color: #333;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 0px;
            box-sizing: border-box;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transition: transform 0.3s ease;
        }

        .image-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
        }

        .sidebar-name {
            position: absolute;
            width: 100%;
            margin-top: 205px;
            background-color: rgba(255, 255, 255, 0.7);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            padding: 7px 0;
        }

        .sidebar img {
            width: 225px;
            height: 225px;
        }

        .sidebar h2 {
            color: #00aaff;
            text-align: center;
            margin-bottom: 20px;
        }


        .sidebar ul {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
        }

        .sidebar ul li a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            display: block;
            text-align: left;
        }

        .sidebar ul li a:hover {
            background-color: #00aaff;
        }

        .sidebar ul li:not(:last-child)::after {
            content: "";
            display: block;
            height: 1px;
            background: grey;
            margin: 10px 0;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }

        .sidebar .social-icons {
            margin-top: auto;
            padding: 20px 0;
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        .sidebar .social-icons a {
            color: #ffffff;
            font-size: 1em;
            text-decoration: none;
        }

        /* Hide sidebar on mobile */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            .sidebar.active {
                transform: translateX(0);
            }
        }

        /* Hamburger Menu */
        .hamburger {
            display: none;
            cursor: pointer;
            font-size: 2em;
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 1000;
        }

        @media (max-width: 768px) {
            .hamburger {
                display: block;
            }
            .sidebar ul {
                font-size:20px;
            }
        }

        /* Main Content Styles */
        .main-content {
            margin-left: 225px;
            flex: 1;
            background-image: url('https://drive.google.com/thumbnail?id=1-NsWdL0F7dlucRJyD1dTxloPllfygQ05&sz=w2000'); /* Replace with your image link */
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
        }

        .main-content h1, .main-content h2 {
            color: #fff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        .main-content h1 span, .main-content h2 span {
            color: #00aaff;
        }

        /* Full-width main content for mobile */
        @media (max-width: 768px) {
            .main-content {
                margin-left: 0;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="hamburger" onclick="toggleSidebar()">☰</div>
    <div class="sidebar">
        <div class="image-container">
            <h2 class="sidebar-name">Enrique Gomez</h2>
            <img src="https://drive.google.com/thumbnail?id=1-pugyKzmu3Rd18wxjqYHlktYODCXAOPk&sz=w2000" alt="Enrique Gomez"> <!-- Replace with your profile image -->
        </div>
        <ul>
            <li><a href="#home"><span class="lnr lnr-home"></span> Home</a></li>
            <li><a href="#profile"><span class="lnr lnr-user"></span> Profile</a></li>
            <li><a href="#experience"><span class="lnr lnr-license"></span> Experience</a></li>
            <li><a href="#projects"><span class="lnr lnr-briefcase"></span> Projects</a></li>
            <li><a href="#contact"><span class="lnr lnr-envelope"></span> Contact</a></li>
        </ul>
        <div class="social-icons">
            <a href="mailto:enrique@engomez.com" title="Email"><span class="fa-stack fa-lg">
  <i class="fa fa-circle-thin fa-stack-2x"></i>
  <i class="fa fa-envelope fa-stack-1x"></i>
</span></a>
            <a href="tel:+447786057009" title="Phone"><span class="fa-stack fa-lg">
  <i class="fa fa-circle-thin fa-stack-2x"></i>
  <i class="fa fa-phone fa-stack-1x"></i>
</span></a>
            <a href="https://www.linkedin.com/in/enrique-gomez-mba-pmp" title="LinkedIn" target="_blank"><span class="fa-stack fa-lg">
  <i class="fa fa-circle-thin fa-stack-2x"></i>
  <i class="fa fa-linkedin fa-stack-1x"></i>
</span></a>

        </div>
    </div>

    <div class="main-content">
        <div>
            <h1>Enrique <span>Gomez</span></h1>
            <h2>Organizational Change Management Lead</h2>
            <h2><span>MBA, PMP, CCMP</span></h2>
        </div>
    </div>

    <script>
        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        }
    </script>
</body>
</html>


