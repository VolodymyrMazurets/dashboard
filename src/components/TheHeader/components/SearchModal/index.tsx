import "./TheHeaderSearchModal.scss";

import { Icon, Modal, Search, Subtle } from "../../../common";
import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../../store/types";
import { Row } from "antd";
import { SearchGroupResponseType } from "../../../../services/http/types";
import { searchesActions } from "../../../../store/modules/searches";

interface Props {
  className?: string;
  visible?: boolean;
  onCancel?: () => void;
}

export const TheHeaderSearchModal: FC<Props> = ({ visible, onCancel }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>();

  const { history, result } = useSelector(
    ({ searchState }: RootState) => searchState
  );

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    dispatch(searchesActions["SEARCH_REQUEST"](value));
  };

  const clearHistory = () => {
    dispatch(searchesActions["SEARCH_CLEAR"]());
  };

  const handleSearchClick = async (url: string, term: string) => {
    try {
      await dispatch(searchesActions["SEARCH_ADD"](term));
      window.location.href = url;
    } catch {}
  };

  const renderHeader = () => {
    return (
      <Search
        value={search}
        onChange={handleChangeSearch}
        placeholder="Search"
        icon="search"
        className="TheHeaderSearchModal__search"
      />
    );
  };

  const renderHistory = () => {
    return history.map((e) => {
      return (
        <li key={e} className="TheHeaderSearchModal__list-item">
          <Row align="middle">
            <Icon
              size={16}
              name="clock"
              className="TheHeaderSearchModal__icon"
            />
            <span className="TheHeaderSearchModal__item-name">{e}</span>
          </Row>
        </li>
      );
    });
  };

  const renderSublist = (data: SearchGroupResponseType) => {
    return (
      <ul className="TheHeaderSearchModal__sublist">
        {(data.Items || []).length &&
          (data.Items || []).map((item) => (
            <li
              className="TheHeaderSearchModal__sublist-item"
              key={item.Text}
              onClick={() => handleSearchClick(item.Url || "", item.Text || "")}
            >
              {item.IconUrl ? (
                <img
                  alt=""
                  src={item.IconUrl}
                  className="TheHeaderSearchModal__icon _img"
                />
              ) : (
                <Icon
                  size={16}
                  name="question"
                  className="TheHeaderSearchModal__icon"
                />
              )}
              <span className="TheHeaderSearchModal__sublist-name">
                {item.Text}
              </span>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      style={{ top: 50 }}
      width={500}
      footer={false}
      className="TheHeaderSearchModal"
      getContainer={"#mainApp"}
      title={renderHeader()}
    >
      <Row justify="space-between" style={{ paddingBottom: 12 }}>
        <span className="TheHeaderSearchModal__search-text">
          Search history
        </span>
        <Subtle onClick={clearHistory} className="TheHeaderSearchModal__subtle">
          Clear
        </Subtle>
      </Row>
      <ul className="TheHeaderSearchModal__list">
        {result.length && search
          ? result.map((e, idx) => {
              return (
                <li key={idx} className="TheHeaderSearchModal__list-item">
                  <Row align="middle">
                    <Icon
                      size={16}
                      name="search"
                      className="TheHeaderSearchModal__icon"
                    />
                    <span className="TheHeaderSearchModal__item-name">
                      {e.Name}
                    </span>
                  </Row>
                  {renderSublist(e)}
                </li>
              );
            })
          : history && renderHistory()}
      </ul>
    </Modal>
  );
};
