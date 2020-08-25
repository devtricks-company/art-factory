import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) =>{ 
      
    this.setState({ fileList })

    if(this.props.setURL){
      if(fileList.length > 0){
        if(fileList && fileList[0].response){
         this.props.setURL(fileList[0].response.url)
        }
  
      }

    }

    if(this.props.setUrls){
      if(fileList.length > 0){
        const curser = fileList.length - 1;
        if(fileList && fileList[curser].response){
          this.props.setUrls(fileList);
        }
      }
    }
   
     
      
     
};

componentDidMount(){
  if(this.props.defaultImage){
    const pic = this.props.defaultImage;
    this.setState({...this.state,fileList:[...this.state.fileList,{
      uid: '-1',
          name: 'image.png',
          status: 'done',
          url:pic
    }]})
  }
  
}

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {setURL} = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://api.artfactoryedu.com/useradmin/toyupload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall
