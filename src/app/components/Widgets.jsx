import React from 'react';
import { Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';

const getClass = (achv) => {
  if (!achv) return 'secondary'; // Default case
  return achv > 99 ? 'success' : achv >= 70 ? 'warning' : 'danger';
};

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       data: [65, 59, 80, 81, 56],
//       borderColor: 'rgba(75, 192, 192, 1)',
//       fill: false,
//     },
//   ],
// };
// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   // Additional Chart.js options...
// };

const Widgets = ({ wdata }) => {
  const domestic_sale = wdata.find(
    (item) => item.name === 'DOMESTIC SALES WITHOUT GENERIC'
  );
  const generic_sale = wdata.find((item) => item.name === 'GENERIC SALES');
  const total_sale = wdata.find((item) => item.name === 'TOTAL DOMESTIC SALES');
  const cluster1 = wdata.find((item) => item.name === 'CLUSTER 1');
  const cluster2 = wdata.find((item) => item.name === 'CLUSTER 2');
  const cluster3 = wdata.find((item) => item.name === 'CLUSTER 3');
  return (
    <>
      <Row>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-right">
                  <i className="mdi mdi-poll-box text-success icon-lg" />
                </div>
                <div className="float-left">
                  <p className="mb-0 text-left text-dark txt-header">
                    Domestic Without Generic
                  </p>
                  <div className="fluid-container">
                    <h6 className="font-weight-semibold text-left mb-0 text-dark">
                      Sales - <span className="">{domestic_sale?.net_amt}</span>
                      <br></br>
                      Target - <span className="">{domestic_sale?.target}</span>
                      <br></br>
                      Ach -{' '}
                      <span className={`text-${getClass(domestic_sale?.achv)}`}>
                        {domestic_sale?.achv}%
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 mb-0">
                <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true" />{' '}
                <span className={`text-${getClass(domestic_sale?.lmgrowth)}`}>
                  {domestic_sale?.lmgrowth}%
                </span>{' '}
                MOM {' | '}{' '}
                <span className={`text-${getClass(domestic_sale?.growth)}`}>
                  {domestic_sale?.growth}%
                </span>{' '}
                YOY growth
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-right">
                  <i className="mdi mdi-cube text-danger icon-lg" />
                </div>
                <div className="float-left">
                  <p className="mb-0 text-left text-dark txt-header">
                    Generic Sales
                  </p>
                  <div className="fluid-container">
                    <h6 className="font-weight-semibold text-left mb-0 text-dark">
                      Sales - <span className="">{generic_sale?.net_amt}</span>
                      <br></br>
                      Target - <span className="">{generic_sale?.target}</span>
                      <br></br>
                      Ach -{' '}
                      <span className={`text-${getClass(generic_sale?.achv)}`}>
                        {generic_sale?.achv}%
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 mb-0">
                <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true" />{' '}
                <span className={`text-${getClass(generic_sale?.lmgrowth)}`}>
                  {generic_sale?.lmgrowth}%
                </span>{' '}
                MOM {' | '}{' '}
                <span className={`text-${getClass(generic_sale?.growth)}`}>
                  {generic_sale?.growth}%
                </span>{' '}
                YOY growth
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-right">
                  <i className="mdi mdi-sort  text-success icon-lg" />
                </div>
                <div className="float-left">
                  <p className="mb-0 text-left text-dark txt-header">
                    Total Sales
                  </p>
                  <div className="fluid-container">
                    <h6 className="font-weight-semibold text-left mb-0 text-dark">
                      Sales - <span className="">{total_sale?.net_amt}</span>
                      <br></br>
                      Target - <span className="">{total_sale?.target}</span>
                      <br></br>
                      Ach -{' '}
                      <span className={`text-${getClass(total_sale?.achv)}`}>
                        {total_sale?.achv}%
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 mb-0">
                <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true" />{' '}
                <span className={`text-${getClass(total_sale?.lmgrowth)}`}>
                  {total_sale?.lmgrowth}%
                </span>{' '}
                MOM {' | '}{' '}
                <span className={`text-${getClass(total_sale?.growth)}`}>
                  {total_sale?.growth}%
                </span>{' '}
                YOY growth
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-right">
                  <i className="mdi mdi-cube text-danger icon-lg" />
                </div>
                <div className="float-left">
                  <p className="mb-0 text-left text-dark txt-header">
                    Cluster Wise Sales
                  </p>
                  <div className="fluid-container">
                    <h6 className="font-weight-semibold text-left mb-0 text-dark">
                      Cluster1 -{' '}
                      <span className="">
                        {' '}
                        {
                          <span className={`text-${getClass(cluster1?.achv)}`}>
                            {cluster1?.achv}
                          </span>
                        }{' '}
                        ({cluster1?.target}/{cluster1?.net_amt})
                      </span>
                      <br></br>
                      Cluster2 -{' '}
                      <span className="">
                        {' '}
                        {
                          <span className={`text-${getClass(cluster2?.achv)}`}>
                            {cluster2?.achv}
                          </span>
                        }{' '}
                        ({cluster2?.target}/{cluster2?.net_amt})
                      </span>
                      <br></br>
                      Cluster3 -{' '}
                      <span className="">
                        {' '}
                        {
                          <span className={`text-${getClass(cluster3?.achv)}`}>
                            {cluster3?.achv}
                          </span>
                        }{' '}
                        ({cluster3?.target}/{cluster3?.net_amt})
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              {/* <p className="text-muted mt-3 mb-0">
                <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true" />{' '}
                 65% MOM growth{' | '} 65% YOY growth 
              </p> */}
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Widgets;
