

import { Box, Button, Modal, Typography } from "@mui/material";

export default function ModalComponent({ open, handleClose, videoKey }) {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">Trailer</h2>
          {videoKey ? (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
             
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ marginTop: "16px" }}
            ></iframe>
          ) : (
            <Typography variant="body1" style={{ marginTop: "16px" }}>
              No hay video disponible
            </Typography>
          )}
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px" }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}



