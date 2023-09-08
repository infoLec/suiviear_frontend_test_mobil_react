import React from 'react';
import { MobilView } from './views/MobilView';

function App() {
    return (
        <MobilView
            isDarkTheme={false}
            userDisplayName="informatique informatique"
            userEmail={'informatique@lec.fr'}
            hasTeamsContext={true}
            environmentMessage="informatique"
            description="informatique"
        />
    );
}

export default App;
