import { useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";

const Captcha = ({ onCaptchaGenerated }) => {
  const canvasRef = useRef(null);

  const getRandomNumber = () => Math.floor(Math.random() * 26) + 6;

  const generateCaptcha = () => {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const answer = num1 + num2;
    const question = `${num1} + ${num2} = ?`;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 140;
    canvas.height = 44;

    // Rounded rect background
    const radius = 10;
    context.beginPath();
    context.moveTo(radius, 0);
    context.lineTo(canvas.width - radius, 0);
    context.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    context.lineTo(canvas.width, canvas.height - radius);
    context.quadraticCurveTo(
      canvas.width,
      canvas.height,
      canvas.width - radius,
      canvas.height,
    );
    context.lineTo(radius, canvas.height);
    context.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    context.lineTo(0, radius);
    context.quadraticCurveTo(0, 0, radius, 0);
    context.closePath();
    context.fillStyle = "#DC2626";
    context.fill();

    // Slight noise lines for anti-bot feel
    context.strokeStyle = "rgba(255,255,255,0.15)";
    context.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      context.beginPath();
      context.moveTo(Math.random() * canvas.width, 0);
      context.lineTo(Math.random() * canvas.width, canvas.height);
      context.stroke();
    }

    context.font = "bold 15px 'Barlow Condensed', monospace";
    context.fillStyle = "white";
    context.letterSpacing = "2px";

    const textWidth = context.measureText(question).width;
    const x = (canvas.width - textWidth) / 2;
    const y = canvas.height / 2 + 5;
    context.fillText(question, x, y);

    onCaptchaGenerated(answer);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="flex items-center gap-3 mb-1">
      <canvas ref={canvasRef} className="rounded-xl" />
      <button
        type="button"
        onClick={generateCaptcha}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-medium"
      >
        <RefreshCw size={12} />
        Refresh
      </button>
    </div>
  );
};

export default Captcha;
