import "./App.css";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import {
  Table,
  ConfigProvider,
  Typography,
  Row,
  Col,
  Spin,
  Radio,
  Button,
  Card,
} from "antd";
import { columns } from "./columns";
import { calculate } from "./calculate";
import EditableTable from "./EditableTable";
const { Title } = Typography;
const { Grid } = Card;

function App() {
  const [results, setResults] = useState([]);
  const [editTable, setEditTable] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState([]);
  const [originCalculatedResults, setOriginCalculatedResults] = useState([]);
  const [radioValue, setRadioValue] = useState(25);
  const [changeOrigin, setChangeOrigin] = useState(true);

  useEffect(() => {
    switch (radioValue) {
      case 21:
        import("./results21").then(handleSetResult);
        break;
      case 22:
        import("./results22").then(handleSetResult);
        break;
      case 23:
        import("./results23").then(handleSetResult);
        break;
      case 24:
        import("./results24").then(handleSetResult);
        break;
      case 25:
        import("./results25").then(handleSetResult);
        break;
      default:
        break;
    }
  }, [radioValue]);

  useEffect(() => {
    if (!results?.length > 0) return;
    let firstCalculatedResults = calculate(results);
    let resWithOutOdafim = calculate(
      results.map((r) => {
        const { odafim, ...r2 } = r;

        return r2;
      })
    );

    firstCalculatedResults = firstCalculatedResults.map((r, index) => {
      return { ...r, totalWithOut: resWithOutOdafim[index].total };
    });

    setCalculatedResults(firstCalculatedResults);
    changeOrigin && setOriginCalculatedResults(firstCalculatedResults);
    setChangeOrigin(false);
  }, [results]);

  const handleSetResult = ({ results }) => {
    setResults(
      results.map((r) => {
        return { ...r, key: r.letters };
      })
    );
  };

  const onChangeResults = (e) => {
    setChangeOrigin(true);
    let value = e?.target?.value;
    setRadioValue(value);
  };

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
                    disabled={editTable}
                    value={radioValue}
                    onChange={onChangeResults}
                    style={{ textAlign: "center" }}
                  >
                    <Radio value={21}>הכנסת ה-21</Radio>
                    <Radio value={22}>הכנסת ה-22</Radio>
                    <Radio value={23}>הכנסת ה-23</Radio>
                    <Radio value={24}>הכנסת ה-24</Radio>
                    <Radio value={25}>הכנסת ה-25</Radio>
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
                      dataSource={calculatedResults.map((cr) => {
                        const origin = originCalculatedResults.find(
                          (ocr) => ocr.letters === cr.letters
                        );
                        return { ...cr, origin };
                      })}
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
      {/* <Row>
        <Col>
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6984793202906050560"
            height="847"
            width="504"
            frameBorder="0"
            allowFullScreen=""
            title="Embedded post"
          ></iframe>
        </Col>
        <Col>
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6972615324735008768"
            height="690"
            width="504"
            frameBorder="0"
            allowFullScreen=""
            title="Embedded post"
          ></iframe>
        </Col>
      </Row> */}
    </Grid>
  );
}

export default App;
