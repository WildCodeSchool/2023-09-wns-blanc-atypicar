import { createTheme, Button, styled } from "@nextui-org/react";

const theme = createTheme({
    type: "light",
    theme: {
        colors: {
            link: '#E76F51',
            blue: '#264653',
            darkerblue: '#203B46',
            green: '#299D8F',
            yellow: '#E9C46A',
            orange: '#F4A261',
            red: '#E76F51',
            darkerred: '#D15738',
            grey: '#F3F3F3',
            darkergrey: '#D5D4D4',
            white: '#FFFFFF',
        },

    }
});

const TagButton = styled(Button, {
    borderRadius: '50px',
    fontSize: '15px',

    [`.${theme} &`]: {
        color: '$blue',
        backgroundColor: '$grey',
        fontWeight: 'medium',
    },

    '&:hover': {
        backgroundColor: '$darkergrey',
    }
});


const TagButtonActive = styled(Button, {
    borderRadius: '50px',
    fontSize: '15px',

    [`.${theme} &`]: {
        color: '$white',
        backgroundColor: '$green',
        fontWeight: 'bold',
    },
    '&:hover': {
        backgroundColor: '$blue',
    }
});

const CancelButton = styled(Button, {
    borderRadius: '50px',
    fontSize: '15px',

    [`.${theme} &`]: {
        color: '$white',
        backgroundColor: '$blue',
        fontWeight: 'medium',
    },

    '&:hover': {
        backgroundColor: '$darkerblue',
    }
});

const ValidButton = styled(Button, {
    borderRadius: '50px',
    fontSize: '15px',

    [`.${theme} &`]: {
        color: '$white',
        backgroundColor: '$red',
        fontWeight: 'medium',
    },

    '&:hover': {
        backgroundColor: '$darkerred',
    }
});



export { theme, TagButton, TagButtonActive, CancelButton, ValidButton };