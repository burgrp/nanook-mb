void i2c_slave_set_rx_buffer(void* buffer, int size);
void i2c_slave_set_tx_buffer(void* buffer, int size);

void i2c_slave_set_start_rd_isr_cb(mgos_cb_t cb, void* arg);
void i2c_slave_set_stop_rd_isr_cb(mgos_cb_t cb, void* arg);
void i2c_slave_set_stop_rd_event_cb(mgos_cb_t cb, void* arg);
void i2c_slave_set_start_wr_isr_cb(mgos_cb_t cb, void* arg);
void i2c_slave_set_stop_wr_isr_cb(mgos_cb_t cb, void* arg);
void i2c_slave_set_stop_wr_event_cb(mgos_cb_t cb, void* arg);