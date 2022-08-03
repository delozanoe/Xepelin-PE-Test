import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const GsheetPage = () => {
  const [rows, setRows] = useState([
  ]);
  const columns = ["id", "tasa", "email"];

  const createData = (id, tasa, email) => {
    return { id, tasa, email, editable: false };
  };

  const classes = useStyles();

  const timeout = useRef(null);

  const handleChangeTasa = (index, event) => {
    let newArray = [...rows];
    newArray[index].tasa = event.target.value;
    setRows(newArray);

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {

      let formdata = new FormData();
      formdata.append("id Op", newArray[index].id);
      formdata.append("Tasa", newArray[index].tasa);

      let requestOptions2 = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      fetch("https://script.google.com/macros/s/AKfycbz4Fm7Cd__doY1j5kdvP44FeqK269xeiXR6S_efBf6ijmxXliBAPESQNIz0mP7syjwcIw/exec", requestOptions2)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      //llamado al correo
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        idOp: newArray[index].id,
        tasa: newArray[index].tasa,
        email: newArray[index].email,
      });


      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://hooks.zapier.com/hooks/catch/6872019/oahrt5g/",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }, 2000);
  };
  const fetchData = () => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzdGKWBhpVhMxc-Aot_w3HxvWAeRC-FOir1GEFt0RMIBZuMhTlFGm61-rdcLTz5TuX16Q/exec"
    )
      .then((response) => response.json())
      .then((data) => {
        let newData = data.data.map((item, index) => {
          if (index !== 0) {
             return createData(item.idOp, item.tasa, item.email);
          }
        });
        newData.shift();
        setRows(newData);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="table-header">Id Operativo</TableCell>
              <TableCell align="left" className="table-header">Tasa</TableCell>
              <TableCell align="left" className="table-header">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column === "tasa" ? (
                            <TextField
                              id="outlined-basic"
                              label=""
                              value={value}
                              variant="standard"
                              onChange={(e) => handleChangeTasa(index, e)}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default GsheetPage;
