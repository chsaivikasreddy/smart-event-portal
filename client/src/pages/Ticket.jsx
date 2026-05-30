import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Ticket() {
  const location = useLocation();

  const ticket =
    location.state || {
      eventName: "No Event",
      ticketNumber: "No Ticket",
    };

  const ticketRef = useRef();

  const downloadPDF = async () => {
    const element = ticketRef.current;

    const canvas =
      await html2canvas(element);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const imgWidth = 190;
    const pageHeight = 295;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    let heightLeft = imgHeight;

    let position = 10;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position =
        heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save(
      `${ticket.ticketNumber}.pdf`
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div
        ref={ticketRef}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Event Ticket
        </h1>

        <h2 className="text-2xl font-bold text-center mb-4">
          {ticket.eventName}
        </h2>

        <div className="bg-green-100 p-4 rounded mb-6">
          <strong>
            Ticket Number:
          </strong>{" "}
          {ticket.ticketNumber}
        </div>

        <div className="flex justify-center">
          <QRCodeCanvas
            value={ticket.ticketNumber}
            size={250}
          />
        </div>

        <p className="text-center mt-4 text-gray-600">
          Present this QR code at
          the event entrance.
        </p>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-bold"
      >
        Download Ticket PDF
      </button>
    </div>
  );
}

export default Ticket;