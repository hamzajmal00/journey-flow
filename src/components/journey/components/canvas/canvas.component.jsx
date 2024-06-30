// src/components/Canvas.jsx
import ConnectArrowIcon from '@/components/common/icons/connect-arrow.icon';
import DeleteIcon from '@/components/common/icons/delete.icon';
import EmailIcon from '@/components/common/icons/email.icon';
import GoogleIcon from '@/components/common/icons/google.icon';
import InstaIcon from '@/components/common/icons/insta.icon';
import MessageIcon from '@/components/common/icons/message.icon';
import PhoneIcon from '@/components/common/icons/phone.icon';
import WhatsappIcon from '@/components/common/icons/whatsapp.icon';
import XIcon from '@/components/common/icons/x.icon';
import YoutubeIcon from '@/components/common/icons/youtube.icon';
import {
  FormControl,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import SwitchIcon from '@/components/common/icons/switch.icon';
import MergeIcon from '@/components/common/icons/merge.icon';

// Mapping of element types to their respective icons
const elementIcons = {
  google: <GoogleIcon />,
  x: <XIcon />,
  instagram: <InstaIcon />,
  whatsapp: <WhatsappIcon />,
  phone: <PhoneIcon />,
  message: <MessageIcon />,
  youtube: <YoutubeIcon />,
  email: <EmailIcon />,
  'double-trigger': <SwitchIcon />,
  'single-trigger': <MergeIcon />,
  // Add more element types and their icons here
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const durations = ['minutes', 'hours', 'days', 'weeks'];
const audiance = ['c1', 'c2', 'c3'];
const groupsOptions = ['read', 'deliver', 'fail'];
const whatsappOptionsStatic = ['1 whatsapp', '2 whatsapp', '3 whatsapp'];
const emailOptionsStatic = ['1 email', '2 email', '3 email'];
const phoneOptionsStatic = ['1 phone', '2 phone', '3 phone'];
const xOptionsStatic = ['1 x', '2 x', '3 x'];
const googleOptionsStatic = ['1 google', '2 google', '3 google'];
const instaOptionsStatic = ['1 insta', '2 insta', '3 insta'];
const messageOptionsStatic = ['1 message', '2 message', '3 message'];
const youtubeOptionsStatic = ['1 youtube', '2 youtube', '3 youtube'];
const names = ['Oliver Hansen', 'Van Henry', 'April Tucker'];

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);
  const [draggingElement, setDraggingElement] = useState(null);
  const [connectingElement, setConnectingElement] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [editableElement, setEditableElement] = useState(null);
  const [editableConnection, setEditableConnection] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [selectedElement1, setSelectedElement1] = useState(null);
  const [selectedElement2, setSelectedElement2] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [mergeLabel, setMergeLabel] = useState(null);
  const [whatsappOptions, setWhatsappOptions] = useState({
    heading: '',
    subheading: '',
  });

  const [emailOptions, setEmailOptions] = useState({
    heading: '',
    subheading: '',
  });
  const [phoneOptions, setPhoneOptions] = useState({
    heading: '',
    subheading: '',
  });
  const [xOptions, setXOptions] = useState({ heading: '', subheading: '' });
  const [googleOptions, setGoogleOptions] = useState({
    heading: '',
    subheading: '',
  });
  const [instaOptions, setInstaOptions] = useState({
    heading: '',
    subheading: '',
  });
  const [messageOptions, setMessageOptions] = useState({
    heading: '',
    subheading: '',
  });
  const [youtubeOptions, setYoutubeOptions] = useState({
    heading: '',
    subheading: '',
  });

  // double trigger popup
  const [waitPeriod, setWaitPeriod] = useState('');
  const [waitDuration, setWaitDuration] = useState('');
  const [groups, setGroups] = useState([
    { id: 1, groupValue: '', audianceValue: '' },
  ]);

  const targetOptions = groups.map((group) => group.groupValue);

  // double trigger popup
  const handleWaitPeriodChange = (event) => {
    setWaitPeriod(event.target.value);
  };

  const handleWaitDurationChange = (event) => {
    setWaitDuration(event.target.value);
  };

  const handleAddGroup = () => {
    setGroups([
      ...groups,
      { id: groups.length + 1, groupValue: '', audianceValue: '' },
    ]);
  };

  const handleGroupChange = (id, field, value) => {
    setGroups(
      groups.map((group) =>
        group.id === id ? { ...group, [field]: value } : group
      )
    );
  };
  const handleChangeElementSelect = (event, setOptions) => {
    const { value, name } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };
  const handleSaveElementsHeadingsPopup = (data) => {
    console.log(data, 'data');
    const label = mergeLabel ? mergeLabel : ` ${data?.subheading} `;
    setNewLabel(label);
    createConnection(label);
    setMergeLabel(null);
    // if (editableConnection) {
    //   // Update existing connection
    //   setConnections((conns) =>
    //     conns.map((conn) =>
    //       conn.id === editableConnection.id ? { ...conn, label } : conn
    //     )
    //   );
    //   setEditableConnection(null);
    // } else {
    //   // Create new connection
    //   createConnection(label);
    // }

    setElements((els) =>
      els.map((el) => {
        if (el.id === popupContent.id) {
          return {
            ...el,
            heading: data?.heading,
            subheading: data?.subheading,
          };
        }
        return el;
      })
    );
    setPopupVisible(false);
  };

  const canvasRef = useRef(null);

  // Handle drop event to add new elements to the canvas
  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x:
        (event.clientX - canvasRef.current.getBoundingClientRect().left) / zoom,
      y: (event.clientY - canvasRef.current.getBoundingClientRect().top) / zoom,
    };

    const newElement = {
      id: `${+new Date()}`,
      type,
      position,
      icon: elementIcons[type] || '❓', // Default icon if type is not found
      heading: 'Default Heading',
      subheading: 'Default Subheading',
    };

    setElements((els) => [...els, newElement]);
  };
  console.log(
    elements,
    'elements,',
    connections,
    'connections',
    draggingElement,
    'draggingElement',
    connectingElement,
    'connectingElement'
  );

  // Handle drag over event to allow dropping
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Handle mouse down event to start dragging an element
  const handleMouseDown = (event, id) => {
    setDraggingElement(id);
  };

  // Handle mouse move event to update the position of the dragged element
  const handleMouseMove = (event) => {
    if (draggingElement) {
      const newPosition = {
        x:
          (event.clientX - canvasRef.current.getBoundingClientRect().left) /
          zoom,
        y:
          (event.clientY - canvasRef.current.getBoundingClientRect().top) /
          zoom,
      };

      setElements((els) =>
        els.map((el) =>
          el.id === draggingElement ? { ...el, position: newPosition } : el
        )
      );
    }
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setDraggingElement(null);
  };

  const handleSaveDoubleTrigger = () => {
    const label = `wait for ${waitPeriod} ${waitDuration}`;
    setNewLabel(label);
    if (editableConnection) {
      // Update existing connection
      setConnections((conns) =>
        conns.map((conn) =>
          conn.id === editableConnection.id ? { ...conn, label } : conn
        )
      );
      setEditableConnection(null);
    } else {
      // Create new connection
      createConnection(label);
    }
    setPopupVisible(false);
  };
  const handleSaveSingleTrigger = () => {
    if (popupContent.type === 'single-trigger') {
      const newLabel = `wait for ${waitPeriod} ${waitDuration}`;
      setMergeLabel(newLabel);
      const newConnections = [];

      if (selectedElement1) {
        const connection1 = {
          id: `${+new Date()}`,
          source: popupContent.id, // Ensure source is set correctly
          target: selectedElement1,
          label: '', // Default label, you can customize this
        };
        newConnections.push(connection1);
      }

      if (selectedElement2) {
        const connection2 = {
          id: `${+new Date()}`,
          source: popupContent.id, // Ensure source is set correctly
          target: selectedElement2,
          label: '', // Default label, you can customize this
        };
        newConnections.push(connection2);
      }

      setConnections((conns) => {
        // Filter out any duplicate connections
        const filteredConnections = conns.filter(
          (conn) =>
            !newConnections.some(
              (newConn) =>
                newConn.source === conn.source && newConn.target === conn.target
            )
        );
        return [...filteredConnections, ...newConnections];
      });
    }
    setPopupVisible(false);
  };

  // Handle element click event to start or finish a connection
  const handleElementClick = (event, id) => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    if (isConnecting) {
      const sourceElement = elements.find((el) => el.id === connectingElement);
      const targetConnections = connections.filter(
        (conn) => conn.target === id
      );
      const sourceConnections = connections.filter(
        (conn) => conn.source === connectingElement
      );

      // Check if the target element is already connected
      if (targetConnections.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Element is already connected to another element',
        });
        setConnectingElement(null);
        setIsConnecting(false);
        return;
      }

      // Ensure 'single-trigger' and 'double-trigger' cannot connect with each other
      if (
        (sourceElement.type === 'single-trigger' &&
          element.type === 'double-trigger') ||
        (sourceElement.type === 'double-trigger' &&
          element.type === 'single-trigger')
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Merge and Switch cannot connect with each other',
        });
        setConnectingElement(null);
        setIsConnecting(false);
        return;
      }
      // Allow 'single-trigger' and 'double-trigger' to connect with any type
      if (
        sourceElement.type === 'single-trigger' ||
        sourceElement.type === 'double-trigger'
      ) {
        // Check connection limits for 'single-trigger' and 'double-trigger'
        if (
          sourceElement.type === 'single-trigger' &&
          sourceConnections.length >= 3
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Merge can only connect with two elements',
          });
          setConnectingElement(null);
          setIsConnecting(false);
          return;
        }
        if (
          sourceElement.type === 'double-trigger' &&
          sourceConnections.length >= 2
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Switch can only connect with two elements',
          });
          setConnectingElement(null);
          setIsConnecting(false);
          return;
        }
      } else {
        // Ensure other types can only connect with 'single-trigger' and 'double-trigger'
        if (
          // element.type !== 'single-trigger' &&
          element.type !== 'double-trigger'
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Connection not allowed',
          });
          setConnectingElement(null);
          setIsConnecting(false);
          return;
        }
      }

      setPopupContent({
        id, // Ensure id is set correctly
        type: element.type,
        heading: element.heading,
        subheading: element.subheading,
      });
      setPopupVisible(true);
    } else {
      // Check if the element is already connected
      const existingConnection = connections.find(
        (conn) => conn.source === id || conn.target === id
      );
      if (existingConnection) {
        setEditableConnection(existingConnection);
        setWaitPeriod(existingConnection.label.split(' ')[2]); // Extract the number
        setWaitDuration(existingConnection.label.split(' ')[3]); // Extract the unit
        setPopupContent({
          id: existingConnection.target, // Ensure id is set correctly
          type: element.type,
          heading: element.heading,
          subheading: element.subheading,
        });
        setPopupVisible(true);
      } else {
        // Show popup with content based on element type
        setPopupContent({
          id: element.id, // Ensure id is set correctly
          type: element.type,
          heading: element.heading,
          subheading: element.subheading,
        });
        setPopupVisible(true);
      }
    }
  };
  const createConnection = (label) => {
    if (connectingElement) {
      const newConnection = {
        id: `${+new Date()}`,
        source: connectingElement,
        target: popupContent.id, // Ensure this is the target element's ID
        label: label || 'wait One Week', // Default label, you can customize this
      };

      setConnections((conns) => [...conns, newConnection]);
      setConnectingElement(null);
      setIsConnecting(false);
    }
  };

  // Handle arrow click event to start a connection
  const handleArrowClick = (event, id) => {
    event.stopPropagation();
    setConnectingElement(id);
    setIsConnecting(true);
  };

  // Handle delete element event
  const handleDeleteElement = (event, id) => {
    event.stopPropagation();
    setElements((els) => els.filter((el) => el.id !== id));
    setConnections((conns) =>
      conns.filter((conn) => conn.source !== id && conn.target !== id)
    );
  };

  // Handle double click event to make an element editable
  const handleDoubleClick = (event, id, field) => {
    event.stopPropagation();
    setEditableElement({ id, field });
  };

  // Handle blur event to stop editing an element
  const handleBlur = () => {
    setEditableElement(null);
  };

  // Handle blur event to stop editing a connection label
  const handleConnectionBlur = () => {
    setEditableConnection(null);
  };

  // Handle wheel event to zoom in and out
  const handleWheel = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
      } else {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [draggingElement]);

  // Get the path for the connection line
  const getPath = (sourcePosition, targetPosition) => {
    const { x: x1, y: y1 } = sourcePosition;
    const { x: x2, y: y2 } = targetPosition;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
      // Horizontal first, then vertical
      return `M${x1},${y1} L${midX},${y1} L${midX},${y2} L${x2},${y2}`;
    } else {
      // Vertical first, then horizontal
      return `M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`;
    }
  };

  return (
    <div
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        flex: 1,
        position: 'relative',
        border: '1px solid #ddd',
        height: '100vh',
        width: '100%',
        transform: `scale(${zoom})`,
        transformOrigin: '0 0',
        overflow: 'auto',
        userSelect: 'none', // Prevent text selection while moving elements
        background: "url('/assets/images/canvas-bg.png')",
        cursor: isConnecting ? 'crosshair' : 'default',
      }}
    >
      {popupVisible && (
        <div
          style={{
            position: 'absolute',
            marginTop: '20px',
            zIndex: 3,
            top: '50%',
            left: ' 50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className=' tw-min-w-[300px] tw-bg-white tw-min-h-[200px] tw-gap-0 tw-border tw-shadow-[0px_0px_10px_0px_#0000001F] tw-rounded-xl tw-border-solid tw-border-[#D0D5DD] tw-left-[509px] tw-top-[140px]'>
            <div className='tw-h-12 tw-px-5 tw-flex tw-items-center tw-justify-between tw-rounded-[12px_12px_0px_0px] tw-bg-[#021133] tw-pl-5 tw-pr-[20px,] tw-py-[12px,]'>
              <div className='tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-white'>
                {popupContent?.type === 'double-trigger'
                  ? 'SWITCH'
                  : popupContent?.type === 'single-trigger'
                  ? 'MERGE'
                  : popupContent?.type.toUpperCase()}
              </div>
              <div
                onClick={() => {
                  setPopupVisible(false);
                  setIsConnecting(false);
                  setConnectingElement(null);
                }}
                className='hover:tw-cursor-pointer'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6L6 18M6 6L18 18'
                    stroke='white'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
            </div>
            <div className='tw-p-4 '>
              {/* <div>Type: {popupContent?.type}</div>
              <div>Heading: {popupContent?.heading}</div>
              <div>Subheading: {popupContent?.subheading}</div> */}
              {/* <button onClick={handleLabelSave}>Save</button> */}
              {popupContent.type === 'whatsapp' && (
                <div className=''>
                  <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                    <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                      Flow
                    </div>
                    <div>
                      <FormControl style={{ minWidth: 525 }}>
                        <Select
                          fullWidth
                          value={whatsappOptions?.heading}
                          name='heading'
                          onChange={(e) =>
                            handleChangeElementSelect(e, setWhatsappOptions)
                          }
                          MenuProps={MenuProps}
                          style={{
                            minWidth: '100% !important',
                            height: '44px',
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span className='tw-text-[#667085]'>
                                  Set group condition
                                </span>
                              );
                            }
                            return selected; // Treat selected as a string
                          }}
                        >
                          {whatsappOptionsStatic.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {popupContent?.id !== elements[0]?.id && (
                    <>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          Target
                        </div>
                        <div>
                          <FormControl style={{ minWidth: 525 }}>
                            <Select
                              fullWidth
                              value={whatsappOptions?.subheading}
                              name='subheading'
                              onChange={(e) =>
                                handleChangeElementSelect(e, setWhatsappOptions)
                              }
                              MenuProps={MenuProps}
                              style={{
                                minWidth: '100% !important',
                                height: '44px',
                              }}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span className='tw-text-[#667085]'>
                                      Set group condition
                                    </span>
                                  );
                                }
                                return selected; // Treat selected as a string
                              }}
                            >
                              {targetOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          End
                        </div>
                        <Switch color='primary' />
                      </div>
                    </>
                  )}
                  <div className='tw-flex tw-justify-end tw-mt-4'>
                    <div
                      onClick={() =>
                        handleSaveElementsHeadingsPopup(whatsappOptions)
                      }
                      className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                    >
                      Save
                    </div>
                  </div>
                </div>
              )}
              {popupContent.type === 'google' && (
                <div className=''>
                  <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                    <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                      Flow
                    </div>
                    <div>
                      <FormControl style={{ minWidth: 525 }}>
                        <Select
                          fullWidth
                          value={googleOptions?.heading}
                          name='heading'
                          onChange={(e) =>
                            handleChangeElementSelect(e, setGoogleOptions)
                          }
                          MenuProps={MenuProps}
                          style={{
                            minWidth: '100% !important',
                            height: '44px',
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span className='tw-text-[#667085]'>
                                  Set group condition
                                </span>
                              );
                            }
                            return selected; // Treat selected as a string
                          }}
                        >
                          {googleOptionsStatic.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {popupContent?.id !== elements[0]?.id && (
                    <>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          Target
                        </div>
                        <div>
                          <FormControl style={{ minWidth: 525 }}>
                            <Select
                              fullWidth
                              value={googleOptions?.subheading}
                              name='subheading'
                              onChange={(e) =>
                                handleChangeElementSelect(e, setGoogleOptions)
                              }
                              MenuProps={MenuProps}
                              style={{
                                minWidth: '100% !important',
                                height: '44px',
                              }}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span className='tw-text-[#667085]'>
                                      Set group condition
                                    </span>
                                  );
                                }
                                return selected; // Treat selected as a string
                              }}
                            >
                              {targetOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          End
                        </div>
                        <Switch color='primary' />
                      </div>
                    </>
                  )}
                  <div className='tw-flex tw-justify-end tw-mt-4'>
                    <div
                      onClick={() =>
                        handleSaveElementsHeadingsPopup(googleOptions)
                      }
                      className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                    >
                      Save
                    </div>
                  </div>
                </div>
              )}
              {popupContent.type === 'instagram' && (
                <div className=''>
                  <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                    <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                      Flow
                    </div>
                    <div>
                      <FormControl style={{ minWidth: 525 }}>
                        <Select
                          fullWidth
                          value={instaOptions?.heading}
                          name='heading'
                          onChange={(e) =>
                            handleChangeElementSelect(e, setInstaOptions)
                          }
                          MenuProps={MenuProps}
                          style={{
                            minWidth: '100% !important',
                            height: '44px',
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span className='tw-text-[#667085]'>
                                  Set group condition
                                </span>
                              );
                            }
                            return selected; // Treat selected as a string
                          }}
                        >
                          {instaOptionsStatic.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {popupContent?.id !== elements[0]?.id && (
                    <>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          Target
                        </div>
                        <div>
                          <FormControl style={{ minWidth: 525 }}>
                            <Select
                              fullWidth
                              value={instaOptions?.subheading}
                              name='subheading'
                              onChange={(e) =>
                                handleChangeElementSelect(e, setInstaOptions)
                              }
                              MenuProps={MenuProps}
                              style={{
                                minWidth: '100% !important',
                                height: '44px',
                              }}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span className='tw-text-[#667085]'>
                                      Set group condition
                                    </span>
                                  );
                                }
                                return selected; // Treat selected as a string
                              }}
                            >
                              {targetOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          End
                        </div>
                        <Switch color='primary' />
                      </div>
                    </>
                  )}
                  <div className='tw-flex tw-justify-end tw-mt-4'>
                    <div
                      onClick={() =>
                        handleSaveElementsHeadingsPopup(instaOptions)
                      }
                      className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                    >
                      Save
                    </div>
                  </div>
                </div>
              )}
              {popupContent.type === 'email' && (
                <div className=''>
                  <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                    <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                      Flow
                    </div>
                    <div>
                      <FormControl style={{ minWidth: 525 }}>
                        <Select
                          fullWidth
                          value={emailOptions?.heading}
                          name='heading'
                          onChange={(e) =>
                            handleChangeElementSelect(e, setEmailOptions)
                          }
                          MenuProps={MenuProps}
                          style={{
                            minWidth: '100% !important',
                            height: '44px',
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span className='tw-text-[#667085]'>
                                  Set group condition
                                </span>
                              );
                            }
                            return selected; // Treat selected as a string
                          }}
                        >
                          {emailOptionsStatic.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {popupContent?.id !== elements[0]?.id && (
                    <>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          Target
                        </div>
                        <div>
                          <FormControl style={{ minWidth: 525 }}>
                            <Select
                              fullWidth
                              value={emailOptions?.subheading}
                              name='subheading'
                              onChange={(e) =>
                                handleChangeElementSelect(e, setEmailOptions)
                              }
                              MenuProps={MenuProps}
                              style={{
                                minWidth: '100% !important',
                                height: '44px',
                              }}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span className='tw-text-[#667085]'>
                                      Set group condition
                                    </span>
                                  );
                                }
                                return selected; // Treat selected as a string
                              }}
                            >
                              {targetOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          End
                        </div>
                        <Switch color='primary' />
                      </div>
                    </>
                  )}
                  <div className='tw-flex tw-justify-end tw-mt-4'>
                    <div
                      onClick={() =>
                        handleSaveElementsHeadingsPopup(emailOptions)
                      }
                      className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                    >
                      Save
                    </div>
                  </div>
                </div>
              )}
              {popupContent.type === 'double-trigger' && (
                <div className=''>
                  <div className='tw-text-base  tw-whitespace-nowrap tw-font-semibold  tw-leading-6 tw-text-left tw-text-[#0b1424]'>
                    Schedule Channel Switch :
                  </div>
                  <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                    <div className='tw-text-base tw-min-w-[180px]  tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                      Wait Period
                    </div>
                    <div>
                      <TextField
                        className='tw-w-[347px] '
                        placeholder='Enter wait Period'
                        value={waitPeriod}
                        onChange={handleWaitPeriodChange}
                        InputProps={{
                          style: { height: '46px', marginTop: '3px' },
                        }}
                      />
                    </div>
                    <div>
                      <FormControl style={{ minWidth: 120 }}>
                        <Select
                          fullWidth
                          value={waitDuration}
                          onChange={handleWaitDurationChange}
                          MenuProps={MenuProps}
                          style={{
                            minWidth: '100% !important',
                            height: '44px',
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span className='tw-text-[#667085]'>
                                  Set wait period
                                </span>
                              );
                            }
                            return selected; // Treat selected as a string
                          }}
                        >
                          {durations.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className='tw-text-base  tw-whitespace-nowrap tw-font-semibold  tw-leading-6 tw-text-left tw-text-[#0b1424]'>
                    Conditions:
                  </div>
                  {groups.map((group) => (
                    <div key={group.id}>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          Group {group.id}
                        </div>
                        <div>
                          <FormControl style={{ minWidth: 525 }}>
                            <Select
                              fullWidth
                              value={group.groupValue}
                              onChange={(e) =>
                                handleGroupChange(
                                  group.id,
                                  'groupValue',
                                  e.target.value
                                )
                              }
                              MenuProps={MenuProps}
                              style={{
                                minWidth: '100% !important',
                                height: '44px',
                              }}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span className='tw-text-[#667085]'>
                                      Set group condition
                                    </span>
                                  );
                                }
                                return selected; // Treat selected as a string
                              }}
                            >
                              {groupsOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                        <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                          Filter Audiance. Where
                        </div>
                        <div>
                          <FormControl style={{ minWidth: 525 }}>
                            <Select
                              fullWidth
                              value={group.audianceValue}
                              onChange={(e) =>
                                handleGroupChange(
                                  group.id,
                                  'audianceValue',
                                  e.target.value
                                )
                              }
                              MenuProps={MenuProps}
                              style={{
                                minWidth: '100% !important',
                                height: '44px',
                              }}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span className='tw-text-[#667085]'>
                                      Select Variable
                                    </span>
                                  );
                                }
                                return selected; // Treat selected as a string
                              }}
                            >
                              {audiance.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='tw-flex tw-justify-end tw-mt-1 tw-text-base  tw-whitespace-nowrap tw-font-medium tw-underline  tw-leading-6 tw-text-left tw-text-[#0b1424] hover:tw-cursor-pointer'>
                    <button onClick={handleAddGroup}>Add Group</button>
                  </div>

                  <div
                    onClick={() => handleSaveDoubleTrigger()}
                    className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                  >
                    Save
                  </div>
                </div>
              )}
              {popupContent.type === 'single-trigger' && (
                <>
                  <div className='content tw-p-4 tw-flex tw-flex-col tw-gap-4'>
                    <div className='tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-black'>
                      Schedule Merge
                    </div>
                    <div className='tw-flex tw-mt-2 tw-gap-4 tw-items-center'>
                      <div className='tw-text-base tw-min-w-[180px]  tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                        Wait Period
                      </div>
                      <div>
                        <TextField
                          className='tw-w-[420px] '
                          placeholder='Enter wait Period'
                          value={waitPeriod}
                          onChange={handleWaitPeriodChange}
                          InputProps={{
                            style: { height: '46px', marginTop: '3px' },
                          }}
                        />
                      </div>
                      <div>
                        <FormControl style={{ minWidth: 120 }}>
                          <Select
                            fullWidth
                            value={waitDuration}
                            onChange={handleWaitDurationChange}
                            MenuProps={MenuProps}
                            style={{
                              minWidth: '100% !important',
                              height: '44px',
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span className='tw-text-[#667085]'>
                                    Set wait period
                                  </span>
                                );
                              }
                              return selected; // Treat selected as a string
                            }}
                          >
                            {durations.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className='tw-flex tw-gap-4 tw-items-center'>
                      <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                        Flow 1
                      </div>
                      <div>
                        <FormControl style={{ minWidth: 600 }}>
                          <Select
                            fullWidth
                            value={selectedElement1}
                            onChange={(e) =>
                              setSelectedElement1(e.target.value)
                            }
                            MenuProps={MenuProps}
                            style={{
                              minWidth: '100% !important',
                              height: '44px',
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span className='tw-text-[#667085]'>
                                    Email- Appoitnment-3
                                  </span>
                                );
                              }
                              return selected;
                            }}
                          >
                            {elements
                              .filter(
                                (el) =>
                                  el.id !== popupContent.id &&
                                  el.id !== selectedElement2
                              )
                              .map((el) => (
                                <MenuItem key={el.id} value={el.id}>
                                  {el.heading}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <div className='tw-flex tw-gap-4 tw-items-center'>
                      <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                        Filter Audience ,where
                      </div>
                      <div>
                        <FormControl style={{ minWidth: 166 }}>
                          <Select
                            fullWidth
                            // value={personName}
                            // onChange={handleChange}
                            MenuProps={MenuProps}
                            style={{
                              minWidth: '100% !important',
                              height: '44px',
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span className='tw-text-[#667085]'>
                                    Free_code4
                                  </span>
                                );
                              }
                              return selected;
                            }}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <FormControl style={{ minWidth: 166 }}>
                          <Select
                            fullWidth
                            // value={personName}
                            // onChange={handleChange}
                            MenuProps={MenuProps}
                            style={{
                              minWidth: '100% !important',
                              height: '44px',
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span className='tw-text-[#667085]'>
                                    Equals
                                  </span>
                                );
                              }
                              return selected;
                            }}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <FormControl style={{ minWidth: 120 }}>
                          <Select
                            fullWidth
                            // value={personName}
                            // onChange={handleChange}
                            MenuProps={MenuProps}
                            style={{
                              minWidth: '100% !important',
                              height: '44px',
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span className='tw-text-[#667085]'>Yes</span>
                                );
                              }
                              return selected;
                            }}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className='tw-w-10 hover:tw-cursor-pointer tw-grid tw-place-content-center tw-h-11 tw-gap-2.5 tw-border tw-p-1.5 tw-rounded-lg tw-border-solid tw-border-[#D0D5DD]'>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M8 1V15M1 8H15'
                            stroke='#667085'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </div>
                      <div className='tw-w-10 hover:tw-cursor-pointer tw-grid tw-place-content-center tw-h-11 tw-gap-2.5 tw-border tw-p-1.5 tw-rounded-lg tw-border-solid tw-border-[#D0D5DD]'>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5'
                            stroke='#667085'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='tw-flex tw-gap-4 tw-items-center'>
                      <div className='tw-text-base tw-min-w-[180px] tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                        Flow 2
                      </div>
                      <div>
                        <FormControl style={{ minWidth: 600 }}>
                          <Select
                            fullWidth
                            value={selectedElement2}
                            onChange={(e) =>
                              setSelectedElement2(e.target.value)
                            }
                            MenuProps={MenuProps}
                            style={{
                              minWidth: '100% !important',
                              height: '44px',
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span className='tw-text-[#667085]'>
                                    Email- Appoitnment-3
                                  </span>
                                );
                              }
                              return selected;
                            }}
                          >
                            {elements
                              .filter(
                                (el) =>
                                  el.id !== popupContent.id &&
                                  el.id !== selectedElement2
                              )
                              .map((el) => (
                                <MenuItem key={el.id} value={el.id}>
                                  {el.heading}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className='tw-flex tw-gap-4 tw-justify-end'>
                      <div
                        onClick={() => setPopupVisible(false)}
                        className='tw-w-[111px] tw-grid tw-place-content-center  tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left tw-text-[#021133] tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] hover:tw-bg-[#021133] hover:tw-text-emerald-50 hover:tw-cursor-pointer'
                      >
                        Discard
                      </div>
                      <div
                        onClick={() => handleSaveSingleTrigger()}
                        className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                      >
                        Save
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1, // Set z-index lower than elements
        }}
      >
        {connections.map((connection) => {
          const sourceElement = elements.find(
            (el) => el.id === connection.source
          );
          const targetElement = elements.find(
            (el) => el.id === connection.target
          );

          if (!sourceElement || !targetElement) return null;

          const sourcePosition = {
            x: sourceElement.position.x + 50,
            y: sourceElement.position.y + 20,
          };
          const targetPosition = {
            x: targetElement.position.x + 50,
            y: targetElement.position.y + 20,
          };

          const midPoint = {
            x: (sourcePosition.x + targetPosition.x) / 2,
            y: (sourcePosition.y + targetPosition.y) / 2,
          };

          return (
            <g key={connection.id}>
              <path
                d={getPath(sourcePosition, targetPosition)}
                stroke='#0FA4DA33'
                strokeWidth='18' // Increased thickness
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <polygon
                points={`${targetPosition.x},${targetPosition.y} ${
                  targetPosition.x - 5
                },${targetPosition.y - 5} ${targetPosition.x + 5},${
                  targetPosition.y - 5
                }`}
                fill='#00bfff'
              />
              <foreignObject
                x={midPoint.x - 50}
                y={midPoint.y - 10}
                width='100'
                height='20'
                style={{ overflow: 'visible', pointerEvents: 'all' }}
              >
                <div
                  // onClick={(event) => handleLabelClick(event, connection)}
                  // onDoubleClick={(event) =>
                  //   handleConnectionDoubleClick(event, connection.id)
                  // }
                  contentEditable={
                    editableConnection === connection.id ? 'true' : 'false'
                  }
                  suppressContentEditableWarning
                  onBlur={handleConnectionBlur}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    textAlign: 'center',
                    fontSize: '12px',
                    cursor:
                      editableConnection === connection.id ? 'text' : 'pointer',
                    userSelect:
                      editableConnection === connection.id ? 'text' : 'none', // Allow text selection only when editing
                  }}
                >
                  {connection.label}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
      {elements.map((element) => (
        <div
          key={element.id}
          onMouseDown={(event) => handleMouseDown(event, element.id)}
          onClick={(event) => handleElementClick(event, element.id)}
          className='parent'
          style={{
            minWidth:
              element.type === 'double-trigger' ||
              element.type === 'single-trigger'
                ? '60px'
                : '149.42px',
            position: 'absolute',
            left: element.position.x,
            top: element.position.y,
            padding: '8px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'move',
            zIndex: 2, // Set z-index higher than connections
            display: 'flex',
            flexDirection:
              element.type === 'double-trigger' ||
              element.type === 'single-trigger'
                ? 'column'
                : 'row',
            alignItems: 'center',
            gap: '8px',
            border: '0.9px solid',
            borderImageSource:
              'linear-gradient(114.06deg, rgba(15, 165, 219, 0.5) -1.13%, rgba(1, 42, 105, 0.5) 146.7%)',
            userSelect: 'none', // Prevent text selection while moving elements
          }}
        >
          <div style={{ fontSize: '24px' }}>{element.icon}</div>
          <div>
            <div
              // onDoubleClick={(event) =>
              //   handleDoubleClick(event, element.id, 'heading')
              // }
              // contentEditable={
              //   editableElement?.id === element.id &&
              //   editableElement?.field === 'heading'
              // }
              suppressContentEditableWarning
              onBlur={handleBlur}
              style={{
                fontFamily: 'Poppins',
                fontSize: '10.8px',
                fontWeight: 500,
                lineHeight: '16.2px',
                textAlign: 'left',
                color: '#475467',
                userSelect:
                  editableElement?.id === element.id ? 'text' : 'none', // Allow text selection only when editing
              }}
            >
              {element.type === 'double-trigger'
                ? 'Switch'
                : element.type === 'single-trigger'
                ? 'Merge'
                : element.heading}
            </div>
            {element.type !== 'double-trigger' &&
              element.type !== 'single-trigger' && (
                <div
                  // onDoubleClick={(event) =>
                  //   handleDoubleClick(event, element.id, 'subheading')
                  // }
                  // contentEditable={
                  //   editableElement?.id === element.id &&
                  //   editableElement?.field === 'subheading'
                  // }
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '9px',
                    fontWeight: 500,
                    lineHeight: '13.5px',
                    textAlign: 'left',
                    color: '#475467',
                    userSelect:
                      editableElement?.id === element.id ? 'text' : 'none', // Allow text selection only when editing
                  }}
                >
                  {element.subheading}
                </div>
              )}
          </div>
          <div
            onClick={(event) => handleArrowClick(event, element.id)}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',

              cursor: 'pointer',
            }}
            className='child1'
          >
            <ConnectArrowIcon />
          </div>
          <div
            onClick={(event) => handleDeleteElement(event, element.id)}
            style={{
              position: 'absolute',
              left: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',

              cursor: 'pointer',
            }}
            className='child2'
          >
            <DeleteIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
