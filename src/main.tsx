import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.tsx";
import UploadNetwork from "./routes/UploadNetwork.tsx";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import Home from "./routes/Home.tsx";
import Error404 from "./routes/Error404.tsx";
import Stations from "./routes/Stations.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "upload",
        element: <UploadNetwork />,
      },
      {
        path: "stations",
        element: <Stations />,
      },
    ],
    errorElement: <Error404 />,
  },
]);

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  headings: { fontFamily: "Montserrat, sans-serif" },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <RouterProvider router={router} />
  </MantineProvider>,
);
