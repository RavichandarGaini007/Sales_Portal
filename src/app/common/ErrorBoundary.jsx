import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * ErrorBoundary Component
 * Catches errors from any child component and displays a fallback UI
 * Prevents entire app crash when lazy-loaded routes or components fail
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container fluid className="mt-5 pt-5">
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="error-boundary-container" style={{ padding: '40px' }}>
                                <h2 style={{ color: '#d32f2f', marginBottom: '20px' }}>
                                    ⚠️ Something went wrong
                                </h2>
                                <p style={{ color: '#666', marginBottom: '20px' }}>
                                    We encountered an unexpected error. Please try refreshing the page or going back to dashboard.
                                </p>

                                {/* Show error details in development */}
                                {process.env.NODE_ENV === 'development' && this.state.error && (
                                    <details style={{
                                        textAlign: 'left',
                                        background: '#f5f5f5',
                                        padding: '15px',
                                        borderRadius: '4px',
                                        marginBottom: '20px',
                                        maxHeight: '200px',
                                        overflow: 'auto'
                                    }}>
                                        <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#d32f2f' }}>
                                            Error Details (Development Only)
                                        </summary>
                                        <pre style={{ marginTop: '10px', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                                            {this.state.error.toString()}
                                            {'\n\n'}
                                            {this.state.errorInfo?.componentStack}
                                        </pre>
                                    </details>
                                )}

                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                    <button
                                        onClick={this.handleReset}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#00d284',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Try Again
                                    </button>
                                    <a
                                        href="/sales_portal/dashboard"
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#1976d2',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                            display: 'inline-block'
                                        }}
                                    >
                                        Go to Dashboard
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
