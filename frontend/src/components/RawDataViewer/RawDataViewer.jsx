import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TablePagination } from "@mui/base/TablePagination";
import axios from "axios";
import { useState } from "react";
import constants from "../../config/config";
import { convert } from "html-to-text";

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
    alert(JSON.stringify(funcReqParams));

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
    <div style={{ marginTop: "20px" }}>
      <form>
        <input id="sqleditor" type="hidden" name="content" />
        <trix-editor input="sqleditor"></trix-editor>
      </form>

      <Button
        onClick={() => {
          executeQuery();
        }}
        variant="contained"
        sx={{ mt: 2, float: "right" }}
      >
        Execute Query
      </Button>

      {JSON.stringify(pageData)}
      <Paper>
        <h1 style={{ textAlign: "center", color: "green" }}>Data Preview</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {pageData.columnNames.map((name) => (
                  <TableCell key={name}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData.response.map((row) => {
                return (
                  <TableRow key={JSON.stringify(row)}>
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
