import { Button } from '@aws-amplify/ui-react';

//@ts-ignore
const CustomSignOutButton = ({ signOut }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 'var(--amplify-space-large)',
    }}>
        <Button
            onClick={signOut}
            style={{
                backgroundColor: '#2D68F8',
                color: 'white',
                fontSize: 'var(--amplify-fontSizes-small)',
                fontWeight: 'var(--amplify-fontWeights-semibold)',
                borderRadius: 'var(--amplify-radii-small)',
                padding: 'var(--amplify-space-xs) var(--amplify-space-small)',
            }}
        >
            Sign Out
        </Button>
    </div>
);

export default CustomSignOutButton;
