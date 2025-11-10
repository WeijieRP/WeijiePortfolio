import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home/Home";
import Abouts from "./Pages/About/Abouts";
import Contact from "./Pages/Contact/Contact";
import Portfolio from "./Pages/Portfolio/Portfolio";
import PortfolioWebsite from "./Pages/Portfolio/Web/PortfolioWebsite";
import PortfolioDesign from "./Pages/Portfolio/Design/PortfolioDesign";
import VirtualRelality from "./Pages/Portfolio/VR/VirtualRelality";
import ProjectWebsite1 from "./Pages/ProjectDetails/Website/ProjectWebsite1";
import ProjectDetailsWebsite2 from "./Pages/ProjectDetails/Website/Website1/ProjectDetailsWebsite2";
import GeekOutProject from "./Pages/ProjectDetails/Website3/GeekOutProject";
import DesignProject from "./Pages/ProjectDetails/Design/Designdetail1/DesignProject";
import ProjectDesign2 from "./Pages/ProjectDetails/Design/Designdetail2/ProjectDesign2";
import VRProjectDetails1 from "./Pages/ProjectDetails/VR/VRProjectDetails1";
import ProjectDetail2VR from "./Pages/ProjectDetails/VR/ProjectDetails2/ProjectDetail2VR";
import Mobile from "./Pages/Portfolio/Mobile/Mobile";
import MoblieProjectDetails1 from "./Pages/ProjectDetails/Moblie1/MoblieProjectDetails1";
import Moblie2ProjectDetails2 from "./Pages/ProjectDetails/Moblie2/Moblie2ProjectDetails2";

export default function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement:<>404</>,
      children: [
        {
          index: true,
          element: <Home />,
        }, {
          path: "/about",
          element: <Abouts />,
          errorElement: <>404 Error Page</>
        }, {
          path: "/contact",
          element: <Contact />,
          errorElement: <>404 not found page</>
        }, {
          path: "/portfolio",
          element: <Portfolio />,
          errorElement: <>404 not found page</>


        }, {
          path: "/portfolio/web",
          element: <PortfolioWebsite />,
          errorElement: <>404 not found page</>

        },
        {
          path: "/portfolio/design",
          element: <PortfolioDesign />,
          errorElement: <>404 not found page</>

        },
        {
          path: "/portfolio/VR",
          element: <VirtualRelality />,
          errorElement: <>404 not found page</>

        },{
          path: "/portfolio/Mobile",
          element: <Mobile/>,
          errorElement: <>404 not found page</>
        },{
          path: "/portfolio/Mobile/projectdetail1",
          element: <MoblieProjectDetails1/>,
          errorElement: <>404 not found page</>
        },
        {
          path: "/portfolio/Mobile/projectdetail2",
          element: <Moblie2ProjectDetails2/>,
          errorElement: <>404 not found page</>
        }
        ,{
          path:"/portfolio/web/projectdetail1",
          element:<ProjectWebsite1/>,
          errorElement: <>404 not found page</>
        },
        {
          path:"/portfolio/web/projectdetail2",
          element:<ProjectDetailsWebsite2/>,
          errorElement: <>404 not found page</>
        },
        {
           path:"/portfolio/web/projectdetail3",
          element:<GeekOutProject/>,
          errorElement: <>404 not found page</>
        }, {
          path:"/portfolio/design/projectdetail1",
          element:<DesignProject/>,
          errorElement:<>404 not found page</>
        },
        {
          path:"/portfolio/design/projectdetail2",
          element:<ProjectDesign2/>,
          errorElement:<>404 not found page</>
        },
        {
          path:"/portfolio/VR/projectdetail1",
          element:<VRProjectDetails1/>,
          errorElement:<>404 not found page</>
        },
         {
          path:"/portfolio/VR/projectdetail2",
          element:<ProjectDetail2VR/>,
          errorElement:<>404 not found page</>
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}
