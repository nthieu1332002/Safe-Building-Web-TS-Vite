import { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard/CustomCard";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import "./style.scss";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";
import dashboardAPI from "../../config/api/dashboard/dashboardAPI";
import ContractChart from "../../components/Chart/ContractChart";
import RevenueChart from "../../components/Chart/RevenueChart";
import {
  changeContractYear,
  changeRevenueYear,
  changeServiceMonth,
  changeServiceYear,
  getContractByYear,
  getRevenueByYear,
  getServiceByMonthYear,
} from "../../store/dashboard/dashboardSlice";
import Loading from "../../components/Loading/Loading";
import ServiceChart from "../../components/Chart/ServiceChart";
import { useAppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { IDashBoard } from "../../types/dashboard.type";

const { getRevenueAPI, getContractAPI } = dashboardAPI;

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    contractList,
    contractLoading,
    contractYear,
    revenueList,
    revenueLoading,
    revenueYear,
    serviceList,
    serviceMonth,
    serviceYear,
    serviceLoading,
  } = useSelector((state: RootState) => state.dashboard);
  const { users } = useSelector((state: RootState) => state.user);
  const [revenue, setRevenue] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [serviceByMonthYear, setServiceByMonthYear] = useState<IDashBoard[]>();
  const [revenueByYear, setRevenueByYear] = useState<IDashBoard[]>();
  const [contractByYear, setContractByYear] = useState<IDashBoard[]>();
  console.log("serviceList", serviceList);
  const fetchRevenue = () => {
    getRevenueAPI()
      .then((res) => {
        if (res.status === 200) {
          setRevenue(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchContract = () => {
    getContractAPI()
      .then((res) => {
        if (res.status === 200) {
          setContract(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchContract();
  }, []);

  useEffect(() => {
    if (contractList.length > 0) {
      setContractByYear(contractList);
    }
  }, [contractList]);

  useEffect(() => {
    if (revenueList.length > 0) {
      setRevenueByYear(revenueList);
    }
  }, [revenueList]);
  useEffect(() => {
    if (serviceList.length > 0) {
      setServiceByMonthYear(serviceList);
    }
  }, [serviceList]);

  const fetchContractByYear = () => {
    dispatch(getContractByYear({ year: contractYear }));
  };

  const handleChangeContractYear = (value: number) => {
    dispatch(changeContractYear(value));
  };
  useEffect(() => {
    fetchContractByYear();
  }, [contractYear]);

  const fetchRevenueByYear = () => {
    dispatch(getRevenueByYear({ year: revenueYear }));
  };

  const handleChangeRevenueYear = (value: number) => {
    dispatch(changeRevenueYear(value));
  };
  useEffect(() => {
    fetchRevenueByYear();
  }, [revenueYear]);

  const fetchServiceByMonthYear = () => {
    dispatch(getServiceByMonthYear({ month: serviceMonth, year: serviceYear }));
  };
  const handleChangeServiceMonth = (value: number) => {
    dispatch(changeServiceMonth(value));
  };
  const handleChangeServiceYear = (value: number) => {
    dispatch(changeServiceYear(value));
  };

  useEffect(() => {
    fetchServiceByMonthYear();
  }, [serviceMonth, serviceYear]);
  return (
    <div className="home-container">
      <div className="page-title">
        <h1>Hello {users?.fullname ?? 'Unknown user'} 👋</h1>
        <p>Let's check stats today!</p>
      </div>
      <div className="statistic-wrapper">
        <div className="statistic-change-wrapper">
          <div className="custom-card-mini">
            <h5 className="card-title">Total revenue</h5>
            <div className="card-content">
              <div className="value">
                {revenue && new Intl.NumberFormat("en-Us").format(revenue.total)} VND
              </div>
              <div className="value-change">
                {revenue?.status === "Increase" ? (
                  <div className="up">
                    <MdTrendingUp /> {revenue?.percent}%
                  </div>
                ) : (
                  <div className="down">
                    <MdTrendingDown /> {revenue?.percent}%
                  </div>
                )}
                <span>vs last month</span>
              </div>
            </div>
          </div>
          <div className="custom-card-mini">
            <h5 className="card-title">Total contract</h5>
            <div className="card-content">
              <div className="value">{contract?.total}</div>
              <div className="value-change">
                {contract?.status === "Increase" ? (
                  <div className="up">
                    <MdTrendingUp /> {contract?.percent}%
                  </div>
                ) : (
                  <div className="down">
                    <MdTrendingDown /> {contract?.percent}%
                  </div>
                )}
                <span>vs last month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-revenue-element">
          <CustomCard width="100%" height="270px">
            <div className="card-header">
              <h3 className="card-title">Revenue</h3>
              <Select
                defaultValue={revenueYear}
                style={{
                  width: 80,
                }}
                onChange={handleChangeRevenueYear}
                options={[
                  {
                    value: "2023",
                    label: "2023",
                  },
                  {
                    value: "2022",
                    label: "2022",
                  },
                  {
                    value: "2021",
                    label: "2021",
                  },
                  {
                    value: "2020",
                    label: "2020",
                  },
                ]}
              />
            </div>
            {revenueLoading ? (
              <Loading />
            ) : (
              <RevenueChart data={revenueByYear} />
            )}
          </CustomCard>
        </div>
      </div>
      <div className="chart-wrapper">
        <CustomCard width="50%" height="320px">
          <div className="card-header">
            <h3 className="card-title">Contract</h3>
            <Select
              defaultValue={contractYear}
              style={{
                width: 80,
              }}
              onChange={handleChangeContractYear}
              options={[
                {
                  value: "2023",
                  label: "2023",
                },
                {
                  value: "2022",
                  label: "2022",
                },
                {
                  value: "2021",
                  label: "2021",
                },
                {
                  value: "2020",
                  label: "2020",
                },
              ]}
            />
          </div>
          {contractLoading ? (
            <Loading />
          ) : (
            <ContractChart data={contractByYear} />
          )}
        </CustomCard>
        <CustomCard width="50%" height="320px">
          <div className="card-header">
            <h3 className="card-title">Services</h3>
            <Space size="small">
              <Select
                defaultValue={serviceMonth}
                style={{
                  width: 80,
                }}
                onChange={handleChangeServiceMonth}
                options={[
                  {
                    value: 1,
                    label: "Jan",
                  },
                  {
                    value: 2,
                    label: "Feb",
                  },
                  {
                    value: 3,
                    label: "Mar",
                  },
                  {
                    value: 4,
                    label: "Apr",
                  },
                  {
                    value: 5,
                    label: "May",
                  },
                  {
                    value: 6,
                    label: "Jun",
                  },
                  {
                    value: 7,
                    label: "Jul",
                  },
                  {
                    value: 8,
                    label: "Aug",
                  },
                  {
                    value: 9,
                    label: "Sep",
                  },
                  {
                    value: 10,
                    label: "Oct",
                  },
                  {
                    value: 11,
                    label: "Nov",
                  },
                  {
                    value: 12,
                    label: "Dec",
                  },
                ]}
              />
              <Select
                defaultValue={serviceYear}
                style={{
                  width: 80,
                }}
                onChange={handleChangeServiceYear}
                options={[
                  {
                    value: "2023",
                    label: "2023",
                  },
                  {
                    value: "2022",
                    label: "2022",
                  },
                  {
                    value: "2021",
                    label: "2021",
                  },
                  {
                    value: "2020",
                    label: "2020",
                  },
                ]}
              />
            </Space>
          </div>
          {serviceLoading ? (
            <Loading />
          ) : (
            <ServiceChart data={serviceByMonthYear} />
          )}
        </CustomCard>
      </div>
    </div>
  );
};

export default Home;
