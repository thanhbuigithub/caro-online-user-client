import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import AddGameModal from './AddGameModal';
import StatisticalIcon from '../../../library/icon/FightIconWhite'
const useStyles = makeStyles((theme) => ({
    card: {
        height: '80%',
        width: '80%',
        display: 'flex',
        margin: '10% auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'inherit',
        cursor: 'pointer',
        border: '3px dashed #ccc',
        '&:hover': {
            border: '3px dashed #8e24aa',
        }
    },
    cardContent: {
        flexGrow: 1
    },
    cardIcon: {
        fontSize: 90,
        padding: theme.spacing(3),
        color: '#8e24aa'
    },
    cardTitle: {
        color: '#8e24aa'
    }
}));

export default function PlayNowGameButton({ onAddBoard }) {
    const classes = useStyles();
    const [displayBoardModal, setDisplayBoardModal] = useState(false);
    const handleShowModal = () => {
        setDisplayBoardModal(true);
    }
    const handleHiddenModal = () => {
        setDisplayBoardModal(false);
    }
    return (
        <>
            <Card className={classes.card} onClick={handleShowModal}>
                <StatisticalIcon className={classes.cardIcon} />
            </Card>
            {displayBoardModal ? <AddGameModal handleToggleModal={handleHiddenModal} onAddBoard={onAddBoard} /> : null}

        </>
    )
}
