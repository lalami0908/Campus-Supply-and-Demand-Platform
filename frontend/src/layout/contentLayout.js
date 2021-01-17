import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
// import JFErrorBoundary from '../../component/JFErrorBoundary/JFErrorBoundary';
import { ROUTE_PRE_FIX } from '../common/constant';
import NotFound from '../page/404';
const { Content } = Layout;

const ContentLayout = React.memo((props) => {
    const navMap = () => {
        const { lan } = props;
        const arr = [];
        const repeatRouter = (nav) => {
            for (let index = 0; index < nav.length; index += 1) {
                if (nav[index].routes) {
                    repeatRouter(nav[index].routes);
                } else {
                    arr.push(
                        <Route
                            {...nav[index]}
                            path={`/${ROUTE_PRE_FIX + props.contentPath}${nav[index].path}`}
                        />,
                    );
                }
            }
        };
        
        repeatRouter(props.router);
        return arr;
    };

    return (
        <Layout style={{ 
            paddingLeft: '10px'
        }}>
            <Content style={{
                background: '#fff', margin: 0, minHeight: 280,
            }}
            >
                <div className="layout-content">
                    <Switch>
                        {
                            navMap()
                        }
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Content>
        </Layout>
    );
    
})
export default ContentLayout