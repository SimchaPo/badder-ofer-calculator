import "./App.css";
import "antd/dist/antd.min.css";
import {
  Table,
  ConfigProvider,
  Typography,
  Row,
  Col,
  Spin,
  Radio,
  Button,
} from "antd";
import Grid from "antd/lib/card/Grid";
import { results as results21 } from "./results21";
import { results as results22 } from "./results22";
import { results as results23 } from "./results23";
import { results as results24 } from "./results24";
import { results as results25 } from "./results25";
import { columns } from "./columns";
import { calculate } from "./calculate";
import { useEffect, useState } from "react";
import EditableTable from "./EditableTable";
const { Title } = Typography;

function App() {
  const [results, setResults] = useState(
    results25.map((r) => {
      return { ...r, key: r.letters };
    })
  );
  const [editTable, setEditTable] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState([]);

  const onChangeResults = (e) => {
    let value = e?.target?.value;
    switch (value) {
      case 1:
        setResults(
          results25.map((r) => {
            return { ...r, key: r.letters };
          })
        );
        break;
      case 2:
        setResults(
          results21.map((r) => {
            return { ...r, key: r.letters };
          })
        );
        break;
      case 3:
        setResults(
          results22.map((r) => {
            return { ...r, key: r.letters };
          })
        );
        break;
      case 4:
        setResults(
          results23.map((r) => {
            return { ...r, key: r.letters };
          })
        );
        break;
      case 5:
        setResults(
          results24.map((r) => {
            return { ...r, key: r.letters };
          })
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let firstCalculatedResults = calculate(results);
    let resWithOutOdafim = calculate(
      results.map((r) => {
        const { odafim, ...r2 } = r;

        return r2;
      })
    );

    setCalculatedResults(
      firstCalculatedResults.map((r, index) => {
        return { ...r, totalWithOut: resWithOutOdafim[index].total };
      })
    );
  }, [results]);

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
            שמחה'ס מחשבון בדר עופר
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
                <Col>
                  <Radio.Group
                    name="radiogroup"
                    defaultValue={1}
                    onChange={onChangeResults}
                    style={{ textAlign: "center" }}
                  >
                    <Radio value={1}>הכנסת ה-25</Radio>
                    <Radio value={2}>הכנסת ה-21</Radio>
                    <Radio value={3}>הכנסת ה-22</Radio>
                    <Radio value={4}>הכנסת ה-23</Radio>
                    <Radio value={5}>הכנסת ה-24</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={() => setEditTable(!editTable)}>
                    {editTable ? "שמור" : "ערוך"}
                  </Button>
                </Col>
              </Row>
              <Row>
                {editTable ? (
                  <Col>
                    <EditableTable results={results} setResults={setResults} />
                  </Col>
                ) : (
                  <Col>
                    <Table
                      dataSource={calculatedResults}
                      columns={columns}
                      pagination={false}
                      rowKey={(r) => r.letters}
                    />
                  </Col>
                )}
              </Row>
            </ConfigProvider>
          )}
        </Col>
      </Row>
    </Grid>
  );
}

export default App;
