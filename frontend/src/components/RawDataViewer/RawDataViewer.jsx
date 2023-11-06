import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { convert } from "html-to-text";
import { useState } from "react";
import constants from "../../config/config";

const RawDataViewer = () => {
  const [pageData, setPageData] = useState({
    pageNum: 0,
    pageLimit: 0,
    totalPages: 0,
    totalRows: 0,
    response: [],
    columnNames: [],
  });

  const [reqParams, setReqParams] = useState({
    pageNum: 0,
    pageLimit: 0,
  });

  const executeQuery = async (funcReqParams = { pageNum: 0, pageLimit: 0 }) => {
    const resp = await axios.post(
      constants.BACKEND_URL + constants.RAW_QUERY_PATH,
      {
        query: convert(document.getElementById("sqleditor").value),
        pageNum: funcReqParams.pageNum,
        pageLimit: funcReqParams.pageLimit,
      }
    );

    setPageData(resp.data);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70vw",
          backgroundColor: "white",
          padding: "2vh",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "8px",
        }}
      >
        <form>
          <input id="sqleditor" type="hidden" name="content" />
          <trix-editor input="sqleditor"></trix-editor>
        </form>
        <Button
          onClick={() => {
            executeQuery();
          }}
          variant="contained"
          sx={{
            mt: 2,
            width: "20%",
            float: "right",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            backgroundColor: "#000042",
          }}
        >
          Execute Query
        </Button>
      </div>

      <h2
        style={{
          textAlign: "center",
          maxWidth: "10vw",
        }}
      >
        Data Preview
      </h2>
      <Paper elevation={3} sx={{ maxWidth: "90vw" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                {pageData.columnNames.map((name) => (
                  <TableCell sx={{ color: "white" }} key={name}>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData.response.map((row) => {
                return (
                  <TableRow hover key={JSON.stringify(row)}>
                    {row.map((record) => {
                      return (
                        <TableCell key={JSON.stringify(record)}>
                          {record}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pageData.totalRows}
          rowsPerPage={pageData.pageLimit}
          page={pageData.pageNum}
          onPageChange={(event) => {
            executeQuery({
              pageNum: event.target.value,
              pageLimit: reqParams.pageLimit,
            });
            setReqParams({ ...reqParams, pageNum: event.target.value });
          }}
          onRowsPerPageChange={(event) => {
            setReqParams({ ...reqParams, pageLimit: event.target.value });
            executeQuery({
              pageNum: reqParams.pageNum,
              pageLimit: event.target.value,
            });
          }}
        />
      </Paper>
    </div>
  );
};

export default RawDataViewer;
