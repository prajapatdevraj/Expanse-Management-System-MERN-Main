import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios';
import Spinner from '../components/Layout/Spinner';
import moment from "moment";
import Analytics from '../components/Layout/Analytics'

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransection, setAllTransection] = useState([])
  const [frequency, setFrequency] = useState('7') // 7=days
  const [selectedDate, setSelectedate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table') // this will default show table in tutnary operator
  const [editable, setEditable] = useState(null)

  // table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',   //name same as transectionmodel
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'   //same as transectionmodel
    },
    {
      title: 'Type',
      dataIndex: 'type'   //same as transectionmodel
    },
    {
      title: 'Category',
      dataIndex: 'category'   //same as transectionmodel
    },
    {
      title: 'Refrence',
      dataIndex: 'refrence'   //same as transectionmodel
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className='mx-2' onClick={()=>{
            handleDelete(record)
          }} />
        </div>
      )
    }
  ]



  //useEffect hook
  useEffect(() => {
    //getall transection
    const getAllTransection = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transections/get-transection', {
          userid: user._id,
          frequency,
          selectedDate,
          type
        })
        setLoading(false)
        setAllTransection(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error("Ftech Issue With Transection");
      }
    }
    getAllTransection();

  }, [frequency, selectedDate, type]);

//form handle Add new or Update
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      // await axios.post('/transections/add-transection',{...values,userid:user._id})  //in a MongoDB database, the default field name for the unique identifier is _id . so this sending id data to userid
      // setLoading(false)
      // message.success('Transections Added Successfully')

      if (editable) { //update old transection
        await axios.post('/transections/edit-transection', { payload: { ...values, userId: user._id }, transacationId: editable._id })
        setLoading(false)
        message.success('Transections Updated Successfully')
      }
      else { // add new transection
        await axios.post('/transections/add-transection', { ...values, userid: user._id })  //in a MongoDB database, the default field name for the unique identifier is _id . so this sending id data to userid
        setLoading(false)
        message.success('Transections Added Successfully')
      }
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transection");
    }
  };
//Delete handle
  const handleDelete =async (record)=>{
    try{
      setLoading(true)
      await axios.post('/transections/delete-transection', {transacationId:record._id})
      setLoading(false)
      message.success('Transaction Deleted')
    }catch (error) {
      setLoading(false);
      console.log(error)
      message.error("Failed to Delete transection");
    }
    
  }
  return (
    <Layout>
      {loading && <Spinner></Spinner>}
      {/* this work as a child in Layout see {children} */}
      <div className='filters'>
        {/* date filter Select Frequency dropdown*/}
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(fValues) => setFrequency(fValues)} >
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedate(values)} />}
        </div>
 
        {/* type filter dropdown*/}
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(tValues) => setType(tValues)} >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        {/*antdesign icons button */}
        <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
          <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
        </div>

        {/* add new button */}
        <div >
          <button className='btn btn-primary' onClick={() => setShowModal(true)} >Add New</button>
        </div>
      </div>


      {/* table & Analytics in ternary operator */}
      <div className='content'>
        {viewData === 'table' ? (<Table columns={columns} dataSource={allTransection} />)
          : (<Analytics allTransection={allTransection}></Analytics>)    // Props={useState}
        }
      </div>



      {/* model */}
      <Modal title={editable ? "Edit Transaction" : "Add Transection"}
        open={showModal} onCancel={() => setShowModal(false)} footer={false} >

        <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>

          <Form.Item label="Amount" name="amount">
            <Input type='text' ></Input>
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="designing">Designing</Select.Option>
              <Select.Option value="petrol">Petrol</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="bill">Bill</Select.Option>
            </Select>
          </Form.Item>
          <FormItem label='Date' name="date">
            <Input type='date'></Input>
          </FormItem>
          <FormItem label='Refrence' name="refrence" >
            <Input type='text'></Input>
          </FormItem>
          <FormItem label='Description' name="description">
            <Input type='text'></Input>
          </FormItem>
          <FormItem >
            <div className='d-flex justify-content-end'>
              <button type="submit" className=' btn btn-primary'>SAVE</button>
            </div>
          </FormItem>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage