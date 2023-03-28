import { Col, Input, Row, Select, Typography } from "antd";
import React, { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import Parents from "../components/Parents";
import api from "../helpers/api";
import { CATEGORY, PRODUCT } from "../helpers/Constants";
import { convertIntoOptionable } from "../helpers/functions";
import useDebounce from "../helpers/hooks/useDebounce";
import {
  SV_LIST_KATEGORI,
  SV_LIST_PRODUK_BY_KATEGORI,
  SV_SHOW_PRICE,
} from "../helpers/uri";

const stateReducer = (state, action) => ({
  ...state,
  ...(typeof action === "function" ? action(state) : action),
});

const FormGroup = () => {
  const [kategoriOpt, setKategoriOpt] = useReducer(stateReducer, {
    CATEGORY: [],
    PRODUCT: [],
  });
  const [selectedOpt, setSelectedOpt] = useState(stateReducer, {
    CATEGORY: {},
    PRODUCT: {},
  });
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState(0);
  const debouncedValue = useDebounce(price, 500);

  const onChangeOption = (value, opt) => {
    console.log("isinya value" + opt, value);

    let uri = "";
    switch (opt) {
      case CATEGORY:
        uri = SV_LIST_PRODUK_BY_KATEGORI + "/" + value.value;
        api
          .get(uri)
          .then((response) => {
            setKategoriOpt((prev) => ({
              ...prev,
              PRODUCT: convertIntoOptionable(response.data.data, [
                "id",
                "nama_produk",
              ]),
            }));
          })
          .catch((err) => {
            return console.log("error opt", err);
          });
        break;
      case PRODUCT:
        setSelectedOpt((prev) => ({
          ...prev,
          PRODUCT: { ...value },
        }));
        break;
      default:
        return;
    }
  };

  const onChangeText = (value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (parseInt(debouncedValue) > 0) {
      let payload = {
        id_produk: selectedOpt?.PRODUCT.value,
        amount: debouncedValue,
      };
      console.log("nilai payload", payload);
      api
        .post(SV_SHOW_PRICE, payload)
        .then((response) => {
          setResult(response.data.data);
        })
        .catch((err) => {
          return console.log("error", err);
        });
      return () => {};
    }
  }, [debouncedValue, selectedOpt]);

  useEffect(() => {
    api
      .get(SV_LIST_KATEGORI)
      .then((response) => {
        setKategoriOpt((prev) => ({
          ...prev,
          CATEGORY: convertIntoOptionable(response.data.data, [
            "id",
            "nama_kategori",
          ]),
        }));
      })
      .catch((err) => {
        return console.log("error", err);
      });

    return () => {};
  }, []);

  console.log("kateg", kategoriOpt);

  return (
    <Parents isBorder>
      <Row style={{ margin: "10px" }}>
        <Col span={12}>
          <Typography.Text style={{ alignSelf: "center" }}>
            Kategori Pekerjaan
          </Typography.Text>
        </Col>
        <Col span={12}>
          <div>
            <Select
              style={{ width: "200px" }}
              labelInValue
              showSearch
              placeholder="Pilih Kategori"
              options={kategoriOpt?.CATEGORY}
              onChange={(value) => onChangeOption(value, CATEGORY)}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ margin: "10px" }}>
        <Col span={12}>
          <Typography.Text>Nama Produk</Typography.Text>
        </Col>
        <Col span={12}>
          <Select
            style={{ width: "200px" }}
            showSearch
            placeholder="Pilih Produk"
            labelInValue
            options={kategoriOpt?.PRODUCT}
            onChange={(value) => onChangeOption(value, PRODUCT)}
          />
        </Col>
      </Row>
      <Row style={{ margin: "10px" }}>
        <Col span={12}>
          <Typography.Text>Jumlah Pesanan</Typography.Text>
        </Col>
        <Col span={12}>
          <Input
            placeholder="Jumlah"
            onChange={(e) => onChangeText(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ margin: "10px" }}>
        <Col span={12}>
          <Typography.Text level={5}>Harga</Typography.Text>
        </Col>
        <Col span={12}>{result.length > 0? result[0]?.harga: "Price not exist"}</Col>
      </Row>
    </Parents>
  );
};

export default FormGroup;
