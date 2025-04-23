import { Form, Button, Container, TabContainer, Dropdown } from "react-bootstrap"
import { Send } from "react-bootstrap-icons"

const Chat = () => {
  return (
    <Container fluid className="rounded-2 d-flex flex-column justify-content-between p-0" style={{height: "90vh"}}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h4 className="fw-semibold">Chat</h4>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Ahmed abdelaleem
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Omar Soma3</Dropdown.Item>
                    <Dropdown.Item>Ziad Nassar</Dropdown.Item>
                    <Dropdown.Item>Hussein Hassan</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className="d-flex flex-column overflow-auto">
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh dkfjsldkfj dkfj dkfjdkfjdkfjdkfjdkfjdkfjdkfjdkfj dkfj sodifusd foisdufo isduf osdfi usdfoid usfoi udfosifusdo fiusdfosdiu fsdofi usdofisd ufosdi fusdofi usdfoisduf osdfiu sdofisdu fosdiuf sdofi udsofisdufosdifu sdofiusdofisd ufiosd fusdoifusdio fufio sdufio</div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
            <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%"}}>
                <div className="fw-bold " style={{fontSize: "17px"}}>bruh 2343434343 </div>
                <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
            </div>
        </div>
        <div className="d-flex gap-3 align-items-center justify-content-between border-top p-3" style={{height: "80px"}}>
            <Form.Control type="msg" placeholder="Enter your message" className="py-2 border-black shadow-sm"/>
            <Button variant="dark" className="d-flex align-items-center justify-content-between shadow-sm" style={{height: "40px"}}> <Send size={20}/> </Button>
        </div>
    </Container>
  )
}

export default Chat