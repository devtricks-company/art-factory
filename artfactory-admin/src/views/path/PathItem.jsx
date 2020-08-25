import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_ALL_GROUPS } from "../../graphql";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select } from "antd";
import PicturesWall from "../../components/picuter/PicturesWall";
import {Link,withRouter} from 'react-router-dom';

const { Option, OptGroup } = Select;
const PathItem = ({ path }) => {
  const [active, setActive] = useState(path.active);
  const [open, setOpen] = useState(false);
  const [pathState, setPathState] = useState(path);
  const { loading: loadingGroup, data } = useQuery(GET_ALL_GROUPS);

  const handleClose = (e) => {
    setOpen(false);
  };

  const [updateActivePath, { loading }] = useMutation(UPDATE_ACTIVE_PATH, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].message);
    },
    variables: { id: path.id, active: !path.active },
  });
  const onChangeActive = () => {
    updateActivePath();
    setActive(!active);
  };

  const editClickHandler = (e) => {
      setOpen(true);
  };
  const changePathStateHandler = (e) => {
    setPathState({ ...pathState, [e.target.name]: e.target.value });
  };

  const setUrl = (url) => {
    setPathState({ ...pathState, icon: url });
  };

  const changeGroupState = (value) => {
    setPathState({ ...pathState, groupId: value });
  };
  const [updatePath,{loading:updatePathLoading}] = useMutation(UPDATE_PATH,{
      update(_,result){

      },
      onError(err){
          console.log(err.graphQLErrors[0].message);
      },
      variables:{id:path.id,...pathState}
  })
  const saveClickHanlder = e => {
        updatePath();
        setOpen(false);
  }

  return (
    <>
      <div className="col-4 path-item bg-dark m-1">
        <span>مسیر</span>
        <h5>{path.name}</h5>
        <Link to={`/admin/pathcourse/${path.id}`} > + اضافه کردن دوره به مسیر</Link>
        <img src={path.icon} alt={path.name} width="50" height="50" />
        <div className="path-container mt-5">
          <FormControlLabel
            style={{ color: "white" }}
            control={
              <Switch
                name="checkedA"
                checked={active}
                onChange={onChangeActive}
              />
            }
            label="فعال"
          />
          <button className="btn btn-success" onClick={editClickHandler}>
            ویرایش مسیر
          </button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">
          {"اضافه کردن مسیر جدید"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="alert-dialog-description"
          >
            <div className="row mt-3">
              <div className="col-12 text-right">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="نام مسیر را وارد کنید"
                  className="form-control p-4"
                  value={pathState.name}
                  onChange={changePathStateHandler}
                />
                <Select
                  defaultValue="گروه را انتخاب کنید"
                  style={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: "1.5rem",
                  }}
                  listHeight={250}
                  listItemHeight={50}
                  onChange={changeGroupState}
                >
                  {data &&
                    data.getAllGroups.length > 0 &&
                    data.getAllGroups.map((group) => (
                      <Option value={group.id}>{group.name}</Option>
                    ))}
                </Select>
                <div className="mt-3">
                  {" "}
                  <PicturesWall setURL={setUrl} defaultImage={path.icon} />
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="text-left w-100">
            <button
              className="btn btn-success px-5"
              style={{ borderRadius: "50px" }}
              onClick={saveClickHanlder}
            >
              ذخیره
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UPDATE_ACTIVE_PATH = gql`
  mutation updateActivePath($id: ID!, $active: Boolean) {
    updateActivePath(id: $id, active: $active) {
      id
      name
      active
      groupId
      icon
    }
  }
`;

const UPDATE_PATH = gql`
 mutation  updatePath($id:ID!,$name:String!,$icon:String,$groupId:String) {
  updatePath(id:$id,name:$name,icon:$icon,groupId:$groupId){
    id
    name
    icon
    groupId
    active
    
  }
}

`;
export default withRouter(PathItem);
