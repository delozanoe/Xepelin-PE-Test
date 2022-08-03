import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import { TextField } from "@mui/material";

import LoadingImg from "../../assets/loading.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "95vw",
    marginLeft: "16px",
    marginRight: "16px",
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
  rowColor:{
    "&:hover":{
      colorBackground: "black !important",
    },
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const GsheetPage = () => {
  const [rows, setRows] = useState([]);

  const [loadingTable, setLoadingTable] = useState(true);

  const [sedingEmail, setSendingEmail] = useState(false);

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
      setSendingEmail(true);

      let requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
          `https://xepelin-backpt.herokuapp.com/send-email/?idOp=${newArray[index].id}&tasa=${newArray[index].tasa}&email=daniellozano.ee@gmail.com`,
          requestOptions
      )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => {
            console.log("error", error)
            setSendingEmail(false)
          });


      let formdata = new FormData();
      formdata.append("id Op", newArray[index].id);
      formdata.append("Tasa", newArray[index].tasa);

      let requestOptions2 = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch(
        "https://script.google.com/macros/s/AKfycbz4Fm7Cd__doY1j5kdvP44FeqK269xeiXR6S_efBf6ijmxXliBAPESQNIz0mP7syjwcIw/exec",
        requestOptions2
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      //llamado al correo

    }, 1000);
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
        setLoadingTable(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loadingTable && (<img src={LoadingImg} alt="img"/>)}
      <div className="gsheet-title">
        <h3>Editar tasas de usuarios</h3>
        <p>Edita las tasas de las siguientes operaciones, recuerda que al hacerlo se enviara un correo informando el cambio.</p>
      </div>

      { !loadingTable && <Paper className={classes.root}>
        {sedingEmail && <LinearProgress color="secondary"/>}

        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="table-header">
                <h6>Id Operativo</h6>
              </TableCell>
              <TableCell align="left" className="table-header">
                <h6>Tasa</h6>
              </TableCell>
              <TableCell align="left" className="table-header">
                <h6>Email</h6>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
                rows.map((row, index) => {
                  return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}  className={classes.rowColor}>
                        {columns.map((column) => {
                          const value = row[column];
                          return (
                              <TableCell key={column.id} align={column.align}>
                                {column === "tasa" ? (
                                    <TextField
                                        id="outlined-basic"
                                        label=""
                                        value={value}
                                        variant="outlined"
                                        color="secondary"
                                        disabled={sedingEmail}
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
      </Paper>}
    </div>
  );
};

export default GsheetPage;
