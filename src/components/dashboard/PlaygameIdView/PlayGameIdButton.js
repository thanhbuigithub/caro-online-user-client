import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import JoinGameModal from './JoinGameModal';
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
        color: '#8e24aa'
    },
    cardTitle: {
        color: '#8e24aa'
    },
    iconPing: {
        padding: theme.spacing(2),
        animation: '$iconSpin 5s cubic-bezier(.8, 0.6, .2, 0.9) infinite',
    },
    "@keyframes iconSpin": {
        "from": {
            transform: "rotate(0deg)"
        },
        "to": {
            transform: "rotate(360deg)"
        }
    },
}));

export default function PlayGameIdButton({ onAddBoard }) {
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
                <div className={classes.iconPing}>
                    <StatisticalIcon className={classes.cardIcon} />
                </div>
            </Card>
            {displayBoardModal ? <JoinGameModal handleToggleModal={handleHiddenModal} onAddBoard={onAddBoard} /> : null}

        </>
    )
}
