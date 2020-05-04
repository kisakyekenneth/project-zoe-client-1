import React from 'react';
import {Box} from "@material-ui/core";
import {remoteRoutes} from "../../data/constants";

import Layout from "../../components/layout/Layout";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Header from "./Header";

import MaterialTable, { Column } from 'material-table';

interface IProps {
    data: any | null
    done?: () => any
}

interface Row {
    taskname: string;
    startdate: Date;
    enddate: Date;
    taskinfo: string;
    volunteers: string;
}
  
interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const AssignedTasks = ({done}: IProps) => {
    const classes = useStyles();

    // For displaying the table data
    const [state, setData] = React.useState<TableState>({
        columns: [
          { title: 'Task Nmae', field: 'taskname' },
          { title: 'Start Date', field: 'startdate' },
          { title: 'End Date', field: 'enddate' },
          { title: 'Task Details', field: 'taskinfo' },
          { title: 'Volunteers', field: 'volunteers' },
        ],
        data: [
        ],
    });

    React.useEffect(() => {
        async function fetchTeamlead() {
            const res = await fetch(remoteRoutes.teamlead);
            const json = await res.json();
            console.log(json);
            setData({
                ...state,
                data:json
            })
        }
        fetchTeamlead();
    }, []);


    return(
        <Layout>
            <Box p={1} className={classes.root}>
                <Header title="Assigned Tasks" />
                <MaterialTable
                    title="Assigned Tasks"
                    columns={state.columns}
                    data={state.data}
                />
            </Box>
        </Layout>
    );
}

export default AssignedTasks;