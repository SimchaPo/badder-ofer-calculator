import "./App.css";
import "antd/dist/antd.min.css";
import { Table, ConfigProvider, Typography, Row, Col, Spin, Radio } from "antd";
import Grid from "antd/lib/card/Grid";
import { results as results21 } from "./results21";
import { results as results22 } from "./results22";
import { results as results23 } from "./results23";
import { results as results24 } from "./results24";
import { columns } from "./columns";
import { calculate } from "./calculate";
import { useState } from "react";
const { Title } = Typography;

function App() {
  const [results, setResults] = useState(results21);

  const onChangeResults = (e) => {
    let value = e?.target?.value;
    switch (value) {
      case 1:
        setResults(results21);
        break;
      case 2:
        setResults(results22);
        break;
      case 3:
        setResults(results23);
        break;
      case 4:
        setResults(results24);
        break;
      default:
        break;
    }
    console.log(e?.target?.value);
  };

  let res = calculate(results);
  let resWithOutOdafim = calculate(
    results.map((r) => {
      const { odafim, ...r2 } = r;

      return r2;
    })
  );

  res = res.map((r, index) => {
    return { ...r, totalWithOut: resWithOutOdafim[index].total };
  });

  return (
    <Grid
      style={{
        width: "100%",
        backgroundColor: "#f0fff0",
      }}
    >
      <Row>
        <Col span={24}>
          <Title mark level={1} style={{ textAlign: "center" }}>
            שמחה'ס מחשבון באדר עופר
          </Title>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          {false ? (
            <Spin />
          ) : (
            <ConfigProvider direction="rtl">
              <Row>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={1}
                  onChange={onChangeResults}
                >
                  <Radio value={1}>הכנסת ה-21</Radio>
                  <Radio value={2}>הכנסת ה-22</Radio>
                  <Radio value={3}>הכנסת ה-23</Radio>
                  <Radio value={4}>הכנסת ה-24</Radio>
                </Radio.Group>
              </Row>
              <Row>
                <Table
                  dataSource={res}
                  columns={columns}
                  pagination={false}
                  rowKey={(r) => r.letters}
                />
              </Row>
            </ConfigProvider>
          )}
        </Col>
      </Row>
    </Grid>
  );
}

export default App;
